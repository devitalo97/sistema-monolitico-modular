export interface RemItemStoreUseCaseInputDto {
    storeId: string,
    items: Array<ItemProps>
}

interface ItemProps {
    id: string,
    productId: string,
}

export interface RemItemStoreUseCaseOutputDto {
    storeId: string,
    ok: boolean
}