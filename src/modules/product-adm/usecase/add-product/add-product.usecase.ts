import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Price from "../../domain/price.entity";
import Product from "../../domain/product.entity";
import Promo from "../../domain/promo.entity";
import ProductGateway from "../../gateway/product.gateway";
import * as DTO from "./add-product.dto";


export default class AddProductUseCase implements UseCaseInterface {
    private _repository: ProductGateway

    constructor(repository: ProductGateway){
        this._repository = repository
    }

    async execute(input: DTO.AddProductUseCaseInputDto): Promise<DTO.AddProductUseCaseOutputDto>{
        const product = new Product({
            ...input,
            price: input.price.map(price => new Price(price as Price)),
            promo: input.promo.map(promo => new Promo(promo as Promo)),
        })
        await this._repository.add(product)
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            medias: product.medias,
            promo: product.promo,
            price: product.price,
            details: product.details,
            ableToSell: product.ableToSell,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }
}