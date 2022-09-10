import Payment from "../domain/payment.entity";

export interface PaymentGateway {
    save(input: Payment): Promise<void>
}