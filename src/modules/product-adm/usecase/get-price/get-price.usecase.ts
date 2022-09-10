import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import * as DTO from './get-price.usecase.dto'
export default class GetPriceUseCase implements UseCaseInterface {
    private _repository: ProductGateway

    constructor(repository: ProductGateway){
        this._repository = repository
    }

    async execute(input: DTO.GetPriceUseCaseInputDto): Promise<DTO.GetPriceUseCaseOutputDto> {
        const productsId = input.products.map(prod => prod.id)
        const pricesId = input.products.map(prod => prod.priceId)

        const products = await this._repository.findByIds({ids: productsId})
        
        const prices = products.map(prod => {
            const price = prod.price.filter(el => pricesId.includes(el.id))[0]
            const obj = {
                id: price.id,
                label: price.label,
                stock: price.stock,
                price: price.price,
                productId: prod.id
            }
            return obj
        })

        return {prices}
    }
} 