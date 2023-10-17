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

  @IsNotEmpty()
  @IsString()
  readonly Adress: string;

  @IsNotEmpty()
  @IsString()
  @IsDate()
  readonly Birthdate: Date;

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

  @IsNotEmpty()
  @IsArray()
  readonly Qr?: string;

  @IsNotEmpty()
  @IsArray()
  readonly Tickets?: string;

  @IsNotEmpty()
  @IsArray()
  readonly Role?: string;
}
