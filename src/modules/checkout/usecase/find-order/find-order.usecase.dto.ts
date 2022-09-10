export interface FindOrderUseCaseInputDto {
    id: string
}

export interface FindOrderUseCaseOutputDto {
    orders: {
        id: string,
        client: {
            id: string,
            name: string,
            document: string,
            email: string,
            address: {
                state: string,
                city: string,
                street: string,
                number: string,
                complement: string,
                zipCode: string,
            }
        },
        products: {
            id: string
            name: string
            description: string
            price: number
        }[],
        status: string
    }[]
}