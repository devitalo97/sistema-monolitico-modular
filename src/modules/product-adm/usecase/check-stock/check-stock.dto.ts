export interface CheckStockUseCaseInputDto {
    products: {
        productId: string;
        priceId: string;
        value?: number;
    }[]
}

export interface CheckStockUseCaseOutputDto {
    products: {
        productId: string;
        priceId: string;
        stock: number;
        available?: boolean;
    }[]
}