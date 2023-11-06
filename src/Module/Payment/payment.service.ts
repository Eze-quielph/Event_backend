import { Injectable } from "@nestjs/common";
import { Payment } from "./entity/payment.entity";

@Injectable()
export class PaymentService{
    constructor(){}
    
    async createPayment(userId:string, paymentId:string){
        try {
            const payment = await Payment.create({userId, paymentId, status: 'pending', result: 'pending'})
            return payment
        } catch (error) {
            return error
        }
    }

    async updatePayment(id:string){
        try {
            const existingPayment = await Payment.findOne({where: {id}})
            if(!existingPayment){
                throw new Error('Payment ID not found')
            }

            const payment = await Payment.update({status: 'approved', result: 'approved'}, {where: {id}})

            return payment
        } catch (error) {
            console.warn(error)
        }
    }
}