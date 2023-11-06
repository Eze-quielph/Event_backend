import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MercadopagoInterface } from 'src/Common/Interfaces/mercadopago-interface';
import { MercadopagoService } from 'src/Config/Mercadopago/mercadopago.service';
import { v4 as UUIDV4 } from 'uuid';

@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private mercadopagoService: MercadopagoService,
  ) {}

  @Get('payment')
  async createPayment(
    @Query('userId') userId: string,
    @Query('title') title: string,
    @Query('unit_price') unitPrice: number,
    @Query('quantity') quantity: number,
  ) {
    try {
      const info: MercadopagoInterface = {
        title,
        unit_price: unitPrice,
        quantity,
      };
      const idUniq = UUIDV4;

      const prefe = this.mercadopagoService.createPayment(idUniq, info);

      const payment = await this.paymentService.createPayment(userId, idUniq);

      return prefe;
    } catch (error) {
      return error;
    }
  }

  @Post('webhook')
  async WebHook(@Body() payment:any) {
    try {
        if(payment.type === 'payment'){
            const transactionId: string = payment.data.id;
            const data: any = await this.mercadopagoService.searchPaymentById(transactionId);
            const id = data.body.metadata.transaction_id;
            const result: any = await this.paymentService.updatePayment(id);
            const userId = result.dataValues.userId;

            return { userId, transactionId, message: 'Pago realizado con exito' };
        }
    } catch (error) {
        console.error(error);
        throw new HttpException(error.message || 'No se pudo encontrar', HttpStatus.BAD_REQUEST);
    }
  }
}
