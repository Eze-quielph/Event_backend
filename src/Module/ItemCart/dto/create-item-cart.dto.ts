import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemCartDto {
    
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    unitPrice: number;
    
    @IsNotEmpty()
    @IsString()
    idShoppingCart: string;
    
    @IsNotEmpty()
    @IsString()
    idEvent: string;
}