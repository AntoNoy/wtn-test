import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { ProfileEntity } from 'src/entities/profile.entity';
import { SendMessageDTO } from 'src/models/dto/send-message.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  getOutBox(profile: ProfileEntity) {
    return this.messageRepository.find({
      where: { from: profile },
      relations: ['to'],
    });
  }

  getInBox(profile: ProfileEntity) {
    return this.messageRepository.find({
      where: { to: profile },
      relations: ['from'],
    });
  }

  async sendMessage(sender: ProfileEntity, message: SendMessageDTO) {
    let newMessage = new MessageEntity();
    Object.assign(newMessage, message);
    newMessage.from = sender;
    newMessage = await this.messageRepository.save(newMessage);
    return this.messageRepository.findOne(newMessage.id);
  }

  getOne(messageId: number, relations: string[] = []) {
    return this.messageRepository.findOne(messageId, { relations });
  }

  deleteOne(messageId: number) {
    return this.messageRepository.delete(messageId);
  }

  async updateText(message: MessageEntity, text: string) {
    if (!message.history) {
      message.history = [];
    }
    message.history.push({
      message: message.message,
      createdAt: message.updatedAt,
    });
    message.message = text;
    await this.messageRepository.save(message);
    return this.messageRepository.findOne(message.id);
  }

  async save(message: MessageEntity) {
    return this.messageRepository.save(message);
  }
}
