import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ItemEntity from '../../domain/item.entity'
import StoreEntity from '../../domain/store.entity'
import StoreGatway from '../../gateway/store.gateway'
import * as DTO from './create-store.usecase.dto'

export default class CreateStoreUseCase implements UseCaseInterface {

    private _storeRepository: StoreGatway

    constructor(storeRepository: StoreGatway){
        this._storeRepository = storeRepository
    }
    async execute(input: DTO.CreateStoreUseCaseInputDto): Promise<DTO.CreateStoreUseCaseOutputDto>{
        const store = new StoreEntity({
            items: input.items.map(item => new ItemEntity(item))
        })

        await this._storeRepository.create(store)
        
        return {
            id: store.id,
            ok: true
        }
    }
}