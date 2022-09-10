import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import * as DTO from "./checkout.facade.dto";
import { CheckoutFacadeInterface } from "./checkout.facade.interface";

type ClientFacadeProps = {
    placeOrderUseCase: UseCaseInterface,
    findOrderUseCase: UseCaseInterface
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
    private _placeOrderUseCase: UseCaseInterface
    private _findOrderUseCase: UseCaseInterface

    constructor(props: ClientFacadeProps){
        this._placeOrderUseCase = props.placeOrderUseCase
        this._findOrderUseCase = props.findOrderUseCase
    }

    async placeOrder(input: DTO.PlaceOrderFacadeInputDto): Promise<DTO.PlaceOrderFacadeOutputDto> {
        return await this._placeOrderUseCase.execute(input)
    }

    async findOrder(input: DTO.FindOrderFacadeInputDto): Promise<DTO.FindOrderFacadeOutputDto> {
        return await this._findOrderUseCase.execute(input)
    }
}