import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProfileEntity } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { SessionEntity } from 'src/entities/session.entity';

@Injectable()
export class AuthService {
  private passwordToken = 10;
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  async login(username: string, password: string): Promise<SessionEntity> {
    console.log('login');
    const profile = await this.profileRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });

    if (!profile || !(await bcrypt.compare(password, profile.password))) {
      throw new NotFoundException('Login informations no valid');
    }

    const oldSessions: SessionEntity[] = await this.sessionRepository.find({
      relations: ['profile'],
      where: [{ profile: { id: profile.id } }, { profile: null }],
    });

    await Promise.all(
      oldSessions.map(async (sess: SessionEntity) => {
        await this.sessionRepository.delete(sess.id);
      }),
    );

    const session = new SessionEntity();
    session.profile = profile;
    await this.sessionRepository.save(session);
    return this.sessionRepository.findOne(session.id);
  }

  logOut(sessionId: string) {
    return this.sessionRepository.delete(sessionId);
  }

  async getSessionById(sessionId: string): Promise<SessionEntity> {
    return this.sessionRepository.findOne(sessionId);
  }

}
