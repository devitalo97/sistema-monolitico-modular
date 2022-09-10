import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import Price from '../../domain/price.entity'
import Product from '../../domain/product.entity'
import Promo from '../../domain/promo.entity'
import ProductGateway from '../../gateway/product.gateway'
import * as DTO from './update-product.usecase.dto'

export default class UpdateProductUseCase implements UseCaseInterface {
    private _repository: ProductGateway

    constructor(repository: ProductGateway){
        this._repository = repository
    }
    
    async execute (input: DTO.UpdateProductUseCaseInputDto): Promise<Product> {
        const update = new Product({
            ...input,
            promo: input?.promo?.map((promo) => new Promo(promo)),
            price: input?.price?.map((price) => new Price(price))
        } as Product)

        const product = await this._repository.update(update)

        return product
    
    }
}