import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDate,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly FirstName: string;

  @IsNotEmpty()
  @IsString()
  readonly LastName: string;

  @IsNotEmpty()
  @IsString()
  readonly Username: string;

  readonly Adress?: string;

  readonly Birthdate?: Date;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly Email: string;

  @IsNotEmpty()
  @IsString()
  readonly Password: string;

  @IsNotEmpty()
  @IsString()
  readonly Image?: string;

  readonly Qr?: string;
  
  readonly Role?: string;
}
