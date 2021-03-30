import { Exclude } from 'class-transformer';
import { MessageType } from 'src/models/message-type.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: MessageType })
  type: MessageType;

  @ManyToOne(() => ProfileEntity, (profile) => profile.messagesSend)
  @JoinColumn()
  from: ProfileEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.messageReceived)
  @JoinColumn()
  to: ProfileEntity;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
