export interface AddClientUseCaseInputDto {
    name: string,
    email: string,
    password?: string,
    document: string,
    address: {
        state: string,
        city: string,
        street: string,
        number: string,
        complement: string,
        zipCode: string
    }
}

export interface AddClientUseCaseOutputDto {
    ok: boolean
}