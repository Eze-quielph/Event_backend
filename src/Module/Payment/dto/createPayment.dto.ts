import { IsNotEmpty, IsString } from "class-validator"

export class CreatePaymentDto{

    @IsNotEmpty()
    @IsString()
    readonly userId: string

    @IsNotEmpty()
    @IsString()
    readonly paymentId: string

    @IsNotEmpty()
    @IsString()
    readonly status: string

    @IsNotEmpty()
    @IsString()
    readonly result: string
}