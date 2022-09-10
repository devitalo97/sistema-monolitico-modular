export interface FindStoreUseCaseInputDto {
    id: string,
}

export interface FindStoreUseCaseOutputDto {
    stores: {
        id: string,
        items: {
            id: string
            productId: string
        }[]
    }[]
}