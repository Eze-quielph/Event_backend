import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import {IsString, IsDate, IsNumber, IsEmpty} from 'class-validator'

export class UpdateEventDto extends PartialType(CreateEventDto) {
    
    @IsEmpty()
    @IsString()
    Name?: string

    @IsEmpty()
    @IsString()
    Description?: string

    @IsEmpty()
    @IsDate()
    Day?: Date

    @IsEmpty()
    @IsDate()
    Hour?: Date

    @IsEmpty()
    @IsNumber()
    Age_min?: number

    @IsEmpty()
    @IsString()
    Category?: string

    @IsEmpty()
    @IsString()
    Ubication?: string

    @IsEmpty()
    @IsNumber()
    Price?: number

    @IsEmpty()
    @IsString()
    Image?: string

    @IsEmpty()
    @IsString()
    Artist?: string

    @IsEmpty()
    @IsNumber()
    Capacity?: number
}
