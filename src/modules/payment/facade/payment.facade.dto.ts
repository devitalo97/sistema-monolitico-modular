export interface ProcessPaymentFacadeInputDto {
    orderId: string,
    amount: number
}

export interface ProcessPaymentFacadeOutputDto {
    id: string,
    orderId: string,
    amount: number,
    status: "approved" | "rejected",
    createdAt: Date,
    updatedAt: Date
}