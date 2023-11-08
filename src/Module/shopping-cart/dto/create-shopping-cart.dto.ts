import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateShoppingCartDto {

    @IsNotEmpty()
    @IsString()
    creationDate: string;

    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsNotEmpty()
    @IsString()
    idUser: string;
}
