import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import * as DTO from "./payment.facade.dto";
import { PaymentFacadeInterface } from "./payment.facade.interface";

type UseCasesProps = {
    processPaymentUseCase: UseCaseInterface
}

export default class PaymentFacade implements PaymentFacadeInterface {
    private _processPaymentUseCase: UseCaseInterface

    constructor(props: UseCasesProps){
        this._processPaymentUseCase = props.processPaymentUseCase
    }

    async processPayment(input: DTO.ProcessPaymentFacadeInputDto): Promise<DTO.ProcessPaymentFacadeOutputDto> {
        return await this._processPaymentUseCase.execute(input)
    }
}