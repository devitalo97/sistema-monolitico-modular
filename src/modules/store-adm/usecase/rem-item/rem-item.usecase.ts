import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ItemEntity from "../../domain/item.entity";
import StoreGatway from "../../gateway/store.gateway";
import * as DTO from './rem-item.usecase.dto'

export default class RemItemStoreUsecase implements UseCaseInterface {
    private _repository

    constructor(repository: StoreGatway){
        this._repository = repository
    }
    async execute({storeId, items}: DTO.RemItemStoreUseCaseInputDto): Promise<DTO.RemItemStoreUseCaseOutputDto>{
        let _items = items?.map(item => new ItemEntity({
            ...item
        }))

        await this._repository.remItem({items: _items, storeId})

        return {
            storeId,
            ok: true
        }
    }
}