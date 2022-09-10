export interface ProcessPaymentUseCaseInputDto {
    orderId: string,
    amount: number
}

export interface ProcessPaymentUseCaseOutputDto {
    status: string
    id: string,
    orderId: string,
    createdAt: Date,
    updatedAt: Date,
    amount: number
}