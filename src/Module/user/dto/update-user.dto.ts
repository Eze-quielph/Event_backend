import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    Username?: string;
    FirstName?: string;
    LastName?: string;
    Adress?: string;
    Image?: string;
}
