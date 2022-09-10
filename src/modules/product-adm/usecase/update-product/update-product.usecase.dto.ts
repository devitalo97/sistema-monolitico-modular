interface PriceProps {
    stock: number
    label: string
    price: number
}

interface PromoProps {
    type: string
    method: string
}

export interface UpdateProductUseCaseInputDto {
    id: string,
    name?: string;
    description?: string;
    medias?: string[];
    details?: {[untypedProp: string]: any};
    price?: PriceProps[];
    ableToSell?: boolean;
    promo?: PromoProps[];
}