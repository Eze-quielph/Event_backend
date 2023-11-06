import { Module } from "@nestjs/common";
import { MercadopagoService } from "./mercadopago.service";

@Module({
    imports: [],
    controllers: [],
    providers: [MercadopagoService],
    exports: [MercadopagoService]
})
export class MercadopagoModule {}