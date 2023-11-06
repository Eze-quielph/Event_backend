import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import {IsString, IsDate, IsNumber, IsNotEmpty} from 'class-validator'

export class UpdateEventDto extends PartialType(CreateEventDto) {
    
    @IsNotEmpty()
    @IsString()
    Name?: string

    @IsNotEmpty()
    @IsString()
    Description?: string

    @IsNotEmpty()
    Day?: Date

    @IsNotEmpty()
    Hour?: Date

    @IsNotEmpty()
    Age_min?: number

    @IsNotEmpty()
    @IsString()
    Category?: string

    @IsNotEmpty()
    @IsString()
    Ubication?: string

    @IsNotEmpty()
    Price?: number

    @IsNotEmpty()
    @IsString()
    Image?: string

    @IsNotEmpty()
    @IsString()
    Artist?: string

    @IsNotEmpty()
    Capacity?: number
}
