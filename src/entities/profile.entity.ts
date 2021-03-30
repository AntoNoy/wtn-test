import { Exclude } from 'class-transformer';
import { OneToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';
import { SessionEntity } from './session.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  @Exclude()
  password: string;

  @OneToMany(() => MessageEntity, (message) => message.from)
  messagesSend: MessageEntity[];

  @OneToMany(() => MessageEntity, (message) => message.to)
  messageReceived: MessageEntity[];

  @OneToOne(() => SessionEntity, (session) => session.profile)
  session: SessionEntity;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
