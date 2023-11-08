import {IsString, IsDate, IsNumber, IsNotEmpty, IsUUID} from 'class-validator'

export class CreateEventDto {

    @IsNotEmpty()
    @IsString()
    Name: string

    @IsNotEmpty()
    @IsString()
    Description: string

    @IsNotEmpty()
    @IsString()
    Day: Date

    @IsNotEmpty()
    @IsString()
    Hour: Date

    @IsNotEmpty()
    Age_min: number

    @IsNotEmpty()
    @IsString()
    Category: string

    @IsNotEmpty()
    @IsString()
    Ubication: string

    @IsNotEmpty()
    Price: number

    @IsNotEmpty()
    @IsString()
    Image: string

    @IsNotEmpty()
    @IsString()
    Artist: string

    @IsNotEmpty()
    Capacity: number

    @IsNotEmpty()
    @IsUUID()
    UserId: string
}
