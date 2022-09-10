import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Order from "../../domain/order.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import * as DTO from './find-order.usecase.dto'

export default class FindOrderUseCase implements UseCaseInterface {
    private _repository: CheckoutGateway

    constructor(repository: CheckoutGateway){
        this._repository = repository
    }

    async execute(input: DTO.FindOrderUseCaseInputDto): Promise<DTO.FindOrderUseCaseOutputDto> {
        const orders =  (await this._repository.find(input)).map(order => ({
            id: order.id,
            status: order.status,
            products: order.products.map(prod => ({
                id: prod.id,
                price: prod.price,
                description: prod.description,
                name: prod.name
            })),
            client: {
                id: order.client.id,
                name: order.client.name,
                document: order.client.document,
                email: order.client.email,
                address: {
                    state: order.client.address.state,
                    city: order.client.address.city,
                    street: order.client.address.street,
                    number: order.client.address.number,
                    complement: order.client.address.complement,
                    zipCode: order.client.address.zipCode,
                }
            }
        }))

        return { orders }
    }
}