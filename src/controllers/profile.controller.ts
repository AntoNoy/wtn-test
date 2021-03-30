import { Body } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { Profile } from 'src/decorators/profile.decorator';
import { ProfileEntity } from 'src/entities/profile.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProfileDTO } from 'src/models/dto/create-profile.dto';
import { ProfileService } from 'src/services/profile.service';

@Controller('profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('create')
  createProfile(@Body() profileData: CreateProfileDTO) {
    return this.profileService
      .createProfile(profileData)
      .catch((err) => new NotFoundException(err));
  }

  @Get('self')
  @UseGuards(AuthGuard)
  self(@Profile() profile: ProfileEntity) {
    return profile;
  }
}
