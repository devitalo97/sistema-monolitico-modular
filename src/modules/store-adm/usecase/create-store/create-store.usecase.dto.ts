export interface CreateStoreUseCaseInputDto {
    items: ItemProps[]
}

interface ItemProps {
    productId: string,
}

export interface CreateStoreUseCaseOutputDto {
    id: string,
    ok: boolean,
}