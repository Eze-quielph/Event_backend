import {IsString, IsDate, IsNumber, IsNotEmpty} from 'class-validator'

export class CreateEventDto {

    @IsNotEmpty()
    @IsString()
    Name: string

    @IsNotEmpty()
    @IsString()
    Description: string

    @IsNotEmpty()
    @IsDate()
    Day: Date

    @IsNotEmpty()
    @IsDate()
    Hour: Date

    @IsNotEmpty()
    @IsNumber()
    Age_min: number

    @IsNotEmpty()
    @IsString()
    Category: string

    @IsNotEmpty()
    @IsString()
    Ubication: string

    @IsNotEmpty()
    @IsNumber()
    Price: number

    @IsNotEmpty()
    @IsString()
    Image: string

    @IsNotEmpty()
    @IsString()
    Artist: string

    @IsNotEmpty()
    @IsNumber()
    Capacity: number
}
