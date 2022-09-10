import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import Product from '../../domain/product.entity'
import ProductGateway from '../../gateway/product.gateway'
import * as DTO from './check-stock.dto'

export default class CheckStockUseCase implements UseCaseInterface {
    private _repository

    constructor(repository: ProductGateway){
        this._repository = repository
    }
    async execute(input: DTO.CheckStockUseCaseInputDto): Promise<DTO.CheckStockUseCaseOutputDto>{
        const productsId = input.products.map(prod => prod.productId)
        const products = await this._repository.findByIds({
            ids: productsId
        })

        const result = []
        for(let _input of input.products){
            const product = products.filter(p => p.id === _input.productId)[0]
            const priceId = _input.priceId
            const price = product.price.filter(price => price.id === priceId)
            const stock = price.length > 0 && price[0].stock

            
            let available = false
            let hasValueInInput = false
            _input.hasOwnProperty('value') && (() => {
                hasValueInInput = true
                available = stock > _input.value
            })() 

            const stockProced = !hasValueInInput ? {
                productId: _input.productId,
                priceId: _input.priceId,
                stock: stock
            } : {
                productId: _input.productId,
                priceId: _input.priceId,
                stock: stock,
                available
            }

            result.push(stockProced)

            
        }
        return {products: result}
    }
}