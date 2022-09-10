import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Payment from "../../domain/payment.entity";
import { PaymentGateway } from "../../gateway/payment.gateway";
import * as DTO from './process-payment.usecase.dto'

export default class ProcessPaymentUseCase implements UseCaseInterface {
    private _repository: PaymentGateway

    constructor(repository: PaymentGateway){
        this._repository = repository
    }

    async execute(input: DTO.ProcessPaymentUseCaseInputDto): Promise<DTO.ProcessPaymentUseCaseOutputDto> {
        const payment = new Payment({...input})
        await payment.process()
        await this._repository.save(payment)
        return {
            id: payment.id,
            status: payment.status,
            orderId: payment.orderId,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
            amount: payment.amount
        }
    }
}