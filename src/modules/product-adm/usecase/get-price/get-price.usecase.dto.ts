export interface GetPriceUseCaseInputDto {
    products: {
        id: string,
        priceId: string,
    }[]
}

export interface GetPriceUseCaseOutputDto {
    prices: {
        id: string,
        price: number,
        label: string,
        stock: number,
        productId: string,
    }[]
}