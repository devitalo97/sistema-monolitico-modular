import ItemEntity from "../domain/item.entity";

export interface AddItemStoreRepositoryInputDto {
    items: ItemEntity[],
    storeId: string
}

export interface RemItemStoreRepositoryInputDto {
    items: ItemEntity[],
    storeId: string
}

export interface FindStoreRepositoryInputDto {
    id: string,
}

export interface RemItemDeletedRepositoryInputDto {
    productId: string,
}
