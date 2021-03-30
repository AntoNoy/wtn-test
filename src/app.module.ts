import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { ProfileController } from './controllers/profile.controller';
import { MessageEntity } from './entities/message.entity';
import { ProfileEntity } from './entities/profile.entity';
import { SessionEntity } from './entities/session.entity';
import { AuthMiddlewayre } from './middlewares/auth.middleware';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';

const entities = [ProfileEntity, MessageEntity, SessionEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'wethenew',
      entities: [...entities],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([...entities])
  ],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, ProfileService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlewayre).forRoutes('*')
  }
 }
