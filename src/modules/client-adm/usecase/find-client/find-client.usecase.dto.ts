export interface FindClientUseCaseInputDto {
    id?: string,
    name?: string,
    email?: string,
    document?: string,
}

export interface FindClientUseCaseOutputDto {
    clients: {
        id: string,
        name: string,
        email: string,
        password: string,
        document: string,
        address: {
            state: string,
            city: string,
            street: string,
            number: string,
            complement: string,
            zipCode: string,
        },
    }[]
}