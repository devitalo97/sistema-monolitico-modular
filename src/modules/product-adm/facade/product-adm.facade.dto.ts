import Price from "../domain/price.entity";
import Promo from "../domain/promo.entity";

interface PriceProps {
    stock: number
    label: string
    price: number
}

interface PromoProps {
    type: string
    method: string
}


export interface AddProductFacadeInputDto {
    name: string;
    description: string;
    ableToSell: boolean;
    details: object;
    medias: Array<string>
    price: Array<PriceProps>;
    promo?: Array<PromoProps>;
}

export interface AddProductFacadeOutputDto {
    id?: string;
    name: string;
    description: string;
    ableToSell: boolean;
    details: object;
    medias: Array<string>;
    price: Price[];
    promo?: Promo[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CheckStockFacadeInputDto {
    products: {
        productId: string;
        priceId: string;
        value?: number;
    }[]
}

export interface CheckStockFacadeOutputDto {
    products: {
        productId: string;
        priceId: string;
        stock: number;
        available?: boolean;
    }[]
}


export interface UpdateProductFacadeInputDto {
    id: string,
    name?: string;
    description?: string;
    medias?: string[];
    details?: {[untypedProp: string]: any};
    price?: Price[];
    ableToSell?: boolean;
    promo?: Promo[];
}

export interface DelelteProductFacadeInputDto {
    productId: string,
}

export interface DelelteProductFacadeOutputDto {
    ok: boolean,
}

export interface FindProductFacadeInputDto {
    products: {
        id: string,
    }[]
}

export interface FindProductFacadeOutputDto {
    products: {
        id: string,
        name: string,
        description: string,
        medias: string[],
        details: {[untypedProp: string]: any},
        price: {
            id: string,
            stock: number
            label: string
            price: number
        }[],
        ableToSell: boolean,
        promo?: {
            id: string,
            type: string
            method: string
        }[],
        createdAt: Date,
        updatedAt: Date,
    }[]
}

export interface GetPriceFacadeInputDto {
    products: {
        id: string,
        priceId: string,
    }[]
}

export interface GetPriceFacadeOutputDto {
    prices: {
        id: string,
        price: number,
        label: string,
        stock: number,
        productId: string,
    }[]
}