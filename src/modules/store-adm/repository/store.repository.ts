import { transform } from "../../../util/transform";
import ItemEntity from "../domain/item.entity";
import StoreEntity from "../domain/store.entity";
import StoreGatway from "../gateway/store.gateway";
import { AppDataSource } from "./database/data-source";
import { StoreModel } from "./store.model";
import * as DTO from './store.repository.dto'

export default class StoreRepository implements StoreGatway {
    private _repository

    constructor(){
        this._repository = AppDataSource.getMongoRepository(StoreModel)
    }
    
    async create(input: StoreEntity): Promise<void> {
        const store = this._repository.create({
            id: input.id,
            items: input?.items?.map(item => transform(item, 'db'))
        })
        await this._repository.save(store)
    }

    async addItem({items, storeId}: DTO.AddItemStoreRepositoryInputDto): Promise<void> {
        await this._repository.updateOne(
            { id: storeId },
            {$push:{
                items: {$each: items?.map((item:any) => transform(item, 'db'))}
            }}
        )
    }

    async remItem({items, storeId}: DTO.RemItemStoreRepositoryInputDto): Promise<void>{
        await this._repository.updateOne(
            { id: storeId },
            { $pullAll:{
                items: items?.map((item:any) => transform(item, 'db'))
            }}
        )
    }

    async find(input: DTO.FindStoreRepositoryInputDto): Promise<StoreEntity[]>{
        return (await this._repository.findBy({...input}))
            .map(store => new StoreEntity({
                ...store,
                items: store?.items?.map(item => new ItemEntity(item))
            }))
    }

    async remItemDeleted({productId}: DTO.RemItemDeletedRepositoryInputDto): Promise<void>{
        await this._repository.bulkWrite([   
            {updateMany: {
                filter: {"items.productId": productId},
                update: { $pull: { items: { productId } } }
            }} 
        ])
    }

}