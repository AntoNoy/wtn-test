import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { MessageType } from 'src/models/message-type.enum';

export class SendMessageDTO {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(MessageType)
  type: MessageType;

  @IsNotEmpty()
  @IsNumber()
  to: number;

  @IsNumber()
  @IsOptional()
  responseOf?: number;
}
