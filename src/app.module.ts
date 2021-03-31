import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { MessageController } from './controllers/message.controller';
import { ProfileController } from './controllers/profile.controller';
import { MessageEntity } from './entities/message.entity';
import { ProfileEntity } from './entities/profile.entity';
import { SessionEntity } from './entities/session.entity';
import { AuthMiddlewayre } from './middlewares/auth.middleware';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { ProfileService } from './services/profile.service';

const entities = [ProfileEntity, MessageEntity, SessionEntity];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.BDDhost || 'localhost',
      port: +process.env.BDDport || 3306,
      username: process.env.BDDusername || 'root',
      password: process.env.BDDpassword || 'root',
      database: process.env.BDDdatabase || 'wethenew',
      entities: [...entities],
      synchronize: (process.env.BDDsynchronize ? true : false) || true,
    }),
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [AuthController, ProfileController, MessageController],
  providers: [AuthService, ProfileService, MessageService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlewayre).forRoutes('*');
  }
}
