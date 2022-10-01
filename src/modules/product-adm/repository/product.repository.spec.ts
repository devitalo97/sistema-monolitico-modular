import Price from "../domain/price.entity";
import Product from "../domain/product.entity";
import { ProductModel } from "./product.model"
import ProductRepository from "./product.repository";
import { AppDataSource } from './database/data-source';
import Promo from "../domain/promo.entity";
import { transform } from "../../../util/transform";

const auxRepo = AppDataSource.getMongoRepository(ProductModel)

const createProductInDb = async (entity: Product) => {
    const product = await auxRepo.create({
        ...transform(entity, 'db'),
        price: entity?.price?.map(price => transform(price, 'db')),
        promo: entity?.promo?.map(promo => transform(promo, 'db'))
    })

    await auxRepo.save(product)
}

describe('Product Repository test', () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })
    afterEach(async () => {
        await AppDataSource.destroy()
    })
    it.skip('should create a product in database', async () => {
        
        const product = new Product({
            name: 'Product #02',
            description: "Product Description #02",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#02'],
            price: [new Price({
                stock: 278,
                label: 'cinza',
                price: 77.88
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
            promo: [
                new Promo({
                    method: 'method',
                    type: 'type'
                })
            ]
        })


        const repository = new ProductRepository()
        await repository.add(product)

        const productInDb = await auxRepo.findBy({
            name: product.name
        })

        expect(productInDb).toBeDefined()
        expect(product.id).toBeDefined()
        expect(product.name).toBe(product.name)
        expect(product.description).toBe(product.description)
        expect(product.ableToSell).toBe(product.ableToSell)
        expect(Array.isArray(product.medias)).toBe(true);
        expect(Array.isArray(product.price)).toBe(true);
        expect(product.price[0]).toBeInstanceOf(Price)
        expect(Array.isArray(product.promo)).toBe(true);
        expect(product.promo[0]).toBeInstanceOf(Promo)
        expect(typeof product.details).toBe('object')
    })

    it.skip('should find a product', async () => {
        //produto para auxiliar no teste
        const product = new Product({
            name: 'Product #02',
            description: "Product Description #02",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#02'],
            price: [new Price({
                stock: 278,
                label: 'cinza',
                price: 77.88
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
            promo: [
                new Promo({
                    method: 'method',
                    type: 'type'
                })
            ]
        })
        
        
        await createProductInDb(product)


        const repository = new ProductRepository()

        const output = await repository.find({id: product.id})

        expect(output).toBeDefined()
        expect(Array.isArray(output)).toBe(true)
        expect(output[0].id).toBe(product.id)
        expect(output[0].name).toBe(product.name)
        expect(output[0].description).toBe(product.description)
        expect(output[0].ableToSell).toBe(product.ableToSell)
        expect(output[0].ableToSell).toBe(product.ableToSell)
        expect(Array.isArray(output[0].medias)).toBe(true)
        expect(Array.isArray(output[0].price)).toBe(true)
        expect(Array.isArray(output[0].promo)).toBe(true)
        expect(output[0].price[0]).toBeInstanceOf(Price)
        expect(output[0].promo[0]).toBeInstanceOf(Promo)
        expect(typeof output[0].details).toBe('object')
        expect(output[0]).toBeInstanceOf(Product)
    })

    it.skip("should update a product",async () => {
        //create product for test
        const product = new Product({
            name: 'Product #02',
            description: "Product Description #02",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#02'],
            price: [new Price({
                stock: 278,
                label: 'cinza',
                price: 77.88
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
            promo: [
                new Promo({
                    method: 'method',
                    type: 'type'
                })
            ]
        })
        
        await createProductInDb(product)

        const repository = new ProductRepository()

        const input = {
            id: product.id,
            name: 'Product #03',
            details: { 
                atributo0: 'valor 2 atualizado',
                atributo1: 'valor 1 atualizado',
            },
        }

        const output = await repository.update(input)

        const productInDb: ProductModel[] = await auxRepo.findBy({
            id: product.id
        })

        expect(productInDb).toBeDefined()
        expect(productInDb[0].id).toBe(input.id)
        expect(productInDb[0].name).toBe(input.name)
        expect(productInDb[0].details).toBeDefined()
        expect(productInDb[0].details).toBeInstanceOf(Object)
        expect(Object.keys(productInDb[0].details).length === 2).toBe(true)
        expect(output).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.id).toBe(input.id)
    })

    it.skip("should delete product", async () => {
        //create product for test
        const product = new Product({
            name: 'Product #02',
            description: "Product Description #02",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#02'],
            price: [new Price({
                stock: 278,
                label: 'cinza',
                price: 77.88
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
            promo: [
                new Promo({
                    method: 'method',
                    type: 'type'
                })
            ]
        })
        
        await createProductInDb(product)

        const repository = new ProductRepository()

        const input = {
            productId: product.id
        }

        await repository.delete(input)

        const productInDd = await auxRepo.findBy({
            id: input.productId
        })
        
        expect(productInDd).toBeDefined()
        expect(productInDd.length === 0).toBe(true)


    })
    it.skip("should get products by array of ids", async () => {
        //create products for test
        const product = new Product({
            name: 'Product #02',
            description: "Product Description #02",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#02'],
            price: [new Price({
                stock: 278,
                label: 'cinza',
                price: 77.88
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
            promo: [
                new Promo({
                    method: 'method',
                    type: 'type'
                })
            ]
        })
        const product0 = new Product({
            name: 'Product #02',
            description: "Product Description #02",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#02'],
            price: [new Price({
                stock: 278,
                label: 'cinza',
                price: 77.88
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
            promo: [
                new Promo({
                    method: 'method',
                    type: 'type'
                })
            ]
        })
        
        await createProductInDb(product)
        await createProductInDb(product0)

        const repository = new ProductRepository()

        const input = {
            ids: [product.id, product0.id]
        }

        const output = await repository.findByIds(input)

        expect(output).toBeDefined()
        expect(Array.isArray(output)).toBeDefined()
        expect(output.filter(el => input.ids.includes(el.id)).length === 2).toBe(true)
        expect(output[0]).toBeInstanceOf(Product)

    })


})