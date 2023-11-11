import { IsNumber } from "class-validator";

export class UpdateItemCartDto {
    @IsNumber()
    quantity: number;
  }
  