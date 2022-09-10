export interface FindProductUseCaseInputDto {
    products: {
        id: string,
    }[]
}

export interface FindProductUseCaseOutputDto {
    products: {
        id: string,
        name: string,
        description: string,
        medias: string[],
        details: {[untypedProp: string]: any},
        price: {
            id: string,
            stock: number
            label: string
            price: number
        }[],
        ableToSell: boolean,
        promo?: {
            id: string,
            type: string
            method: string
        }[],
        createdAt: Date,
        updatedAt: Date,
    }[]
}