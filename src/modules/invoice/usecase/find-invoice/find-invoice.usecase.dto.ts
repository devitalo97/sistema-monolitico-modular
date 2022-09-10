// DTO Find
export interface FindInvoiceUseCaseInputDTO {
    id: string;
}

export interface FindInvoiceUseCaseOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: {
        productId: string;
        price: number;
        name: string;
    }[];
    total: number;
    createdAt: Date;
}