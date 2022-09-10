import Price from "../../domain/price.entity";
import Promo from "../../domain/promo.entity";

interface PriceProps {
    id?: string,
    stock: number
    label: string
    price: number
}

interface PromoProps {
    id?: string,
    type: string
    method: string
}

export interface AddProductUseCaseInputDto {
    name: string,
    description: string,
    medias: string[],
    details: {[untypedProp: string]: any},
    ableToSell: boolean,
    price: PriceProps[];
    promo?: PromoProps[];
}

export interface AddProductUseCaseOutputDto {
    id: string,
    name: string,
    description: string,
    medias: string[],
    details: {[untypedProp: string]: any},
    price: PriceProps[],
    ableToSell: boolean,
    promo?: PromoProps[],
    createdAt: Date,
    updatedAt: Date,
}