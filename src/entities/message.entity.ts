import { Exclude } from 'class-transformer';
import { MessageHistory } from 'src/models/message-history.interface';
import { MessageType } from 'src/models/message-type.enum';
import { OneToOne } from 'typeorm';
import { OneToMany } from 'typeorm';
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

  @Column({ type: 'longtext' })
  message: string;

  @Column({ type: 'enum', enum: MessageType })
  type: MessageType;

  @ManyToOne(() => ProfileEntity, (profile) => profile.messagesOutbox)
  @JoinColumn()
  from: ProfileEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.messagesInbox)
  @JoinColumn()
  to: ProfileEntity;

  @Column('json', { default: '[]' })
  history: MessageHistory[];

  @Column({ nullable: true })
  read: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => MessageEntity, (message) => message.answers)
  @JoinColumn()
  responseOf: MessageEntity;

  @OneToMany(() => MessageEntity, (message) => message.responseOf)
  @JoinColumn()
  answers: MessageEntity[];
}
