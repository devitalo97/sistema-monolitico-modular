import productEntity from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";
import { AppDataSource } from './database/data-source'
import { transform } from "../../../util/transform";
import Product from "../domain/product.entity";
import Price from "../domain/price.entity";
import Promo from "../domain/promo.entity";
import * as DTO from './product.repository.dto'

export default class ProductRepository implements ProductGateway {
    private _repository

    constructor(){
        this._repository = AppDataSource.getMongoRepository(ProductModel)
    }
    async add(input: productEntity): Promise<void> {
        const product = this._repository.create({
            id: input.id,
            name: input.name,
            description: input.description,
            ableToSell: input.ableToSell,
            price: input?.price?.map(variant => transform(variant, 'db')),
            promo: input?.promo?.map(variant => transform(variant, 'db')),
            medias: input.medias,
            details: input.details,
        })
        await this._repository.save(product)
    }
    async find(input: DTO.FindProductRepositoryInputDto): Promise<productEntity[]> {
        const product = (await this._repository.findBy({...input})).map((product) => {
            return new Product({
                ...product,
                price: product?.price?.map(price => new Price(price)),
                promo: product?.promo?.map(promo => new Promo(promo))
            })
        })
        return product
    }
    async update(product: DTO.UpdateProductRepositoryInputDto): Promise<Product> {
        
        const update = {
            ...transform(product, 'db'),
            price: {...product?.price?.map(price => transform(price, 'db'))},
            promo: {...product?.promo?.map(promo => transform(promo, 'db'))},
        }

        !product.price && delete update.price
        !product.promo && delete update.promo
        
        await this._repository.updateOne(
            {id: product.id}, 
            {$set: update}
        )

        const productInDb = await this._repository.findOneBy({id: product.id})
        
        //atualizar o item na coleção store
        
        return new Product({
            ...productInDb,
            price: product?.price?.map(price => new Price(price)),
            promo: product?.promo?.map(promo => new Promo(promo))
        })
    }
    async delete(input: DTO.DeleteProductRepositoryInputDto): Promise<void> {
        await this._repository.delete({id: input.productId})
    }
    async findByIds(input: DTO.FindMultiProductInputDto): Promise<Product[]>{
        return (await this._repository.aggregate([
            { $match: { id: { $in: input.ids } } }
        ]).toArray()).map(prod => new Product(prod))
    }
} 