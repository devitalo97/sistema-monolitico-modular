export interface FindClientFacadeInputDto{
    id?: string,
    name?: string,
    email?: string,
    document?: string,
}

export interface FindClientFacadeOutputDto {
    clients: {
        id: string,
        name: string,
        email: string,
        password: string
        document: string
        address: {
            state: string,
            city: string,
            street: string,
            number: string,
            complement: string,
            zipCode: string,
        }
    }[]
}
export interface AddClientFacadeInputDto{
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
        zipCode: string,
    } 
}
export interface AddClientFacadeOutputDto{
    ok: boolean
}