import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import * as DTO from './find-product.usecase.dto'

export default class FindProductUseCase {
    private _repository: ProductGateway

    constructor(repository: ProductGateway){
        this._repository = repository
    }
    
    async execute(input: DTO.FindProductUseCaseInputDto): Promise<DTO.FindProductUseCaseOutputDto> {
        const ids = input.products.map(product => product.id)
        const products = (await this._repository.findByIds({ids})).map(prod => ({
            id: prod.id,
            name: prod.name,
            description: prod.description,
            medias: prod.medias,
            details: prod.details,
            price: prod?.price?.map(price => ({
                id: price.id,
                stock: price.stock,
                label: price.label,
                price: price.price
            })),
            ableToSell: prod.ableToSell,
            promo: prod?.promo?.map(promo => ({
                id: promo.id,
                type: promo.type,
                method: promo.method,
            })),
            createdAt: prod.createdAt,
            updatedAt: prod.updatedAt,
        }))
        return { products }
    }
}