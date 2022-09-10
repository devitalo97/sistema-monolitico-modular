import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import StoreEntity from "../../domain/store.entity";
import StoreGatway from "../../gateway/store.gateway";
import * as DTO from './find-store.usecase.dto'

export default class FindStoreUseCase implements UseCaseInterface {
    private _repository: StoreGatway

    constructor(repository: StoreGatway){
        this._repository = repository
    }
    
    async execute(input: DTO.FindStoreUseCaseInputDto): Promise<DTO.FindStoreUseCaseOutputDto> {
        const stores = (await this._repository.find(input)).map(store => ({
            id: store.id,
            items: store?.items.map(item => ({
                id: item.id,
                productId: item.productId,
            }))
        }))
        return { stores }
   }
}