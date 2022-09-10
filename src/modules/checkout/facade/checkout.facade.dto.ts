export interface PlaceOrderFacadeInputDto {
    products: {
        productId: string,
        priceId: string,
    }[],
    clientId: string
}

export interface PlaceOrderFacadeOutputDto {
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





export interface FindOrderFacadeInputDto {
    id: string
}

export interface FindOrderFacadeOutputDto {
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