import Price from "../domain/price.entity";
import Promo from "../domain/promo.entity";

export interface UpdateProductRepositoryInputDto {
    id: string,
    name?: string;
    description?: string;
    medias?: string[];
    details?: {[untypedProp: string]: any};
    price?: Price[];
    ableToSell?: boolean;
    promo?: Promo[];
}


export interface DeleteProductRepositoryInputDto {
    productId: string
}

export interface FindProductRepositoryInputDto {
    id?: string,
    name?: string,
}

export interface FindMultiProductInputDto {
    ids: string[]
}