import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProfileEntity } from 'src/entities/profile.entity';
import { CreateProfileDTO } from 'src/models/dto/create-profile.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  private passwordHash = 10;
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async createProfile(profileData: CreateProfileDTO): Promise<ProfileEntity> {
    profileData.password = await bcrypt.hash(
      profileData.password,
      this.passwordHash,
    );
    return this.profileRepository.save(profileData);
  }
}
