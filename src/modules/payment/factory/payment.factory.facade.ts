import PaymentFacade from "../facade/payment.facade";
import PaymentRepository from "../repository/payment.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFactory {
    static create(){

        const repository = new PaymentRepository()

        const processPaymentUseCase = new ProcessPaymentUseCase(repository)

        const facade = new PaymentFacade({
            processPaymentUseCase
        })

        return facade
    }
}