import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ProductGateway from '../../gateway/product.gateway'
import * as DTO from './del-product.usecase.dto'

export default class DeleteProductUseCase implements UseCaseInterface {
    private _repository: ProductGateway

    constructor(repository: ProductGateway){
        this._repository = repository
    }
    async execute(input: DTO.DelProductUseCaseInputDto): Promise<DTO.DelProductUseCaseOutputDto>{
        await this._repository.delete(input)
        return {
            ok: true
        }
    }
}