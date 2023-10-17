import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly Email: string;

  @IsNotEmpty()
  @IsString()
  readonly Password: string;
}
