import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
