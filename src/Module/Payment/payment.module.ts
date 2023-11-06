import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { MercadopagoService } from "src/Config/Mercadopago/mercadopago.service";

@Module({
    imports: [],
    controllers: [],
    providers: [PaymentService],
})
export class PaymentModule {}