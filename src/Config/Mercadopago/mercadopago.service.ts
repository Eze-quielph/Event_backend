import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { MercadopagoInterface } from 'src/Common/Interfaces/mercadopago-interface';

@Injectable()
export class MercadopagoService {
  public mercadopago: MercadoPagoConfig = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  });

  constructor() {}

  public payment: Payment = new Payment(this.mercadopago);

  public async createPayment(paymentId: string, info: MercadopagoInterface) {
    try {
      const body = {
        body: {
          items: [
            {
              title: info.title,
              unit_price: info.unit_price,
              quantity: info.quantity,
              currency_id: 'ARS',
            },
          ],
          back_urls: {
            success: 'http://localhost:3000/payment/success',
            failure: 'http://localhost:3000/payment/failure',
            pending: 'http://localhost:3000/payment/pending',
          },
          notification_url: 'http://localhost:3000/payment/notification',
        },
      };

      const payment = await this.payment.create(body);
      
      return payment
    } catch (error) {
      console.warn(error);
    }
  }

  async searchPaymentById(paymentId: string) {
    try{
        const payment = await this.payment.search()
        return payment
    }catch(error){
        console.warn(error)
    }
  }
}
