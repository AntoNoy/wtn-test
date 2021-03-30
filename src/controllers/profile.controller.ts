import { Body } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { ProfileEntity } from 'src/entities/profile.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProfileDTO } from 'src/models/dto/create-profile.dto';
import { AuthService } from 'src/services/auth.service';
import { ProfileService } from 'src/services/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  @Post('create')
  createProfile(@Body() profileData: CreateProfileDTO) {
    return this.profileService
      .createProfile(profileData)
      .catch((err) => new NotFoundException(err));
  }

  @Get('self')
  @UseGuards(AuthGuard)
  self(@User() user: ProfileEntity) {
    return user;
  }
}
