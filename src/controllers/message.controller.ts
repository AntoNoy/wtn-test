import { Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { SerializeOptions } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Profile } from 'src/decorators/profile.decorator';
import { MessageEntity } from 'src/entities/message.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { SendMessageDTO } from 'src/models/dto/send-message.dto';
import { MessageService } from 'src/services/message.service';
import { ProfileService } from 'src/services/profile.service';
import { asReceiver, asSender } from 'src/utils/user-message.util';

@Controller('messages')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class MessageController {
  constructor(
    private messageService: MessageService,
    private profileService: ProfileService,
  ) {}

  /**
   * Send a message
   */
  @Post('send')
  async sendMessage(
    @Profile() profile: ProfileEntity,
    @Body() message: SendMessageDTO,
  ): Promise<MessageEntity> {
    const destinationProfile = await this.profileService.getById(message.to);
    if (!destinationProfile) {
      throw new NotFoundException('Destinataire non existant');
    }
    if (
      message.responseOf &&
      !(await this.messageService.getOne(message.responseOf))
    ) {
      throw new NotFoundException("Message d'origine non existant");
    }
    return this.messageService.sendMessage(profile, message);
  }

  /**
   * Get all message from profile Inbox
   */
  @Get('inbox')
  @SerializeOptions({
    excludePrefixes: ['history'],
  })
  getInBox(@Profile() profile: ProfileEntity): Promise<MessageEntity[]> {
    return this.messageService.getInBox(profile);
  }

  /**
   * Get all message from profile Outbox
   */
  @Get('outbox')
  @SerializeOptions({
    excludePrefixes: ['history'],
  })
  getOutBox(@Profile() profile: ProfileEntity): Promise<MessageEntity[]> {
    return this.messageService.getOutBox(profile);
  }

  /**
   * Delete a message
   * Only for receiver
   */
  @Delete(':messageId')
  async deleteMessage(
    @Profile() profile: ProfileEntity,
    @Param('messageId', ParseIntPipe) messageId: number,
  ): Promise<any> {
    const message = await this.messageService.getOne(messageId, ['from', 'to']);
    if (!message) {
      throw new NotFoundException();
    }
    if (!asReceiver(profile, message)) {
      throw new UnauthorizedException();
    }
    return this.messageService.deleteOne(message.id);
  }

  /**
   * Change message text
   * Only for receiver and sender
   */
  @Patch('update/:messageId')
  async updateText(
    @Body() newMessage,
    @Profile() profile: ProfileEntity,
    @Param('messageId', ParseIntPipe) messageId: number,
  ): Promise<MessageEntity> {
    const message = await this.messageService.getOne(messageId, ['from', 'to']);
    if (!message) {
      throw new NotFoundException();
    }
    if (!asReceiver(profile, message) && !asSender(profile, message)) {
      throw new UnauthorizedException();
    }
    return this.messageService.updateText(message, newMessage.text);
  }

  /**
   * Get one message
   * Only for receiver end sender
   */
  @Get(':messageId')
  async getOne(
    @Param('messageId', ParseIntPipe) messageId: number,
    @Profile() profile: ProfileEntity,
  ): Promise<MessageEntity> {
    const message = await this.messageService.getOne(messageId, [
      'from',
      'to',
      'answers',
      'responseOf',
    ]);
    if (!message) {
      throw new NotFoundException();
    }
    if (!asSender(profile, message) && !asReceiver(profile, message)) {
      throw new UnauthorizedException();
    }
    if (!message.read && asReceiver(profile, message)) {
      message.read = new Date();
      await this.messageService.save(message);
    }
    return message;
  }
}
