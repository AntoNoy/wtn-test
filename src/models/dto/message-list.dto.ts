import { Exclude } from "class-transformer";
import { MessageEntity } from "src/entities/message.entity";
import { ProfileEntity } from "src/entities/profile.entity";
import { MessageHistory } from "../message-history.interface";
import { MessageType } from "../message-type.enum";

export class MessageListResponseDTO {
  id: number;

  message: string;

  type: MessageType;

  from: ProfileEntity;

  to: ProfileEntity;

  @Exclude()
  history: MessageHistory[];

  @Exclude()
  read: Date;

  createdAt: Date;

  updatedAt: Date;

  @Exclude()
  responseOf: MessageEntity;

  @Exclude()
  answers: MessageEntity[];
}
