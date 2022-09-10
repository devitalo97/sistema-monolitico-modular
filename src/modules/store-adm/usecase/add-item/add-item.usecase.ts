import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import Item from '../../domain/item.entity'
import StoreGatway from '../../gateway/store.gateway'
import * as DTO from './add-item.usecase.dto'

export default class AddItemStoreUseCase implements UseCaseInterface {
    private _repository: StoreGatway

    constructor(repository: StoreGatway){
        this._repository = repository
    }

    async execute({items, storeId}: DTO.AddItemUseCaseInputDto): Promise<DTO.AddItemUseCaseOutputDto>{
        let _items = items?.map(item => new Item({
            ...item
        }))

        await this._repository.addItem({items: _items, storeId})

        return {
            storeId,
            ok: true
        }
    }
}