export interface CreateStoreAdmFacadeInputDto {
    items: Array<ItemProps>
}

interface ItemProps {
    productId: string,
}

export interface CreateStoreAdmFacadeOutputDto {
    id: string
    ok: boolean
}



export interface AddItemStoreAdmFacadeInputDto {
    storeId: string,
    items: Array<ItemProps>
}

export interface AddItemStoreAdmFacadeOutputDto {
    storeId: string,
    ok: boolean
}




export interface RemItemStoreAdmFacadeInputDto {
    storeId: string,
    items: Array<ItemProps>
}

export interface RemItemStoreAdmFacadeOutputDto {
    storeId: string,
    ok: boolean
}




export interface FindStoreAdmFacadeInputDto {
    id: string,
}

export interface FindStoreAdmFacadeOutputDto {
    stores: {
        id: string,
        items: {
            id: string
            productId: string
        }[]
    }[]
}

export interface RemItemDeletedStoreAdmFacadeInputDto {
    productId: string,
}

export interface RemItemDeletedStoreAdmFacadeOutputDto {
    ok: boolean
}