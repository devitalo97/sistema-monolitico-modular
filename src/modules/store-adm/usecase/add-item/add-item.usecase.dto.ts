export interface AddItemUseCaseInputDto {
    storeId: string,
    items: Array<ItemProps>
}

interface ItemProps {
    productId: string,
}

export interface AddItemUseCaseOutputDto {
    storeId: string,
    ok: boolean
}