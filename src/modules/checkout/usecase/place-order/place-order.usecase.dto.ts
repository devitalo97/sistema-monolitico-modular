export interface PlaceOrderUseCaseInputDto {
    products: {
        productId: string,
        priceId: string,
    }[],
    clientId: string
}

export interface PlaceOrderUseCaseOutputDto {
    id: string,
    invoiceId: string,
    clientId: string
    status: string,
    total: number,
    products: {
        productId: string,
        price: number,
    }[],
}