import * as DTO from './checkout.facade.dto'

export interface CheckoutFacadeInterface {
    placeOrder(input: DTO.PlaceOrderFacadeInputDto): Promise<DTO.PlaceOrderFacadeOutputDto>
    findOrder(input: DTO.FindOrderFacadeInputDto): Promise<DTO.FindOrderFacadeOutputDto>
}