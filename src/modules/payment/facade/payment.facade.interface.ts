import * as DTO from './payment.facade.dto'

export interface PaymentFacadeInterface {
    processPayment(input: DTO.ProcessPaymentFacadeInputDto): Promise<DTO.ProcessPaymentFacadeOutputDto>
}