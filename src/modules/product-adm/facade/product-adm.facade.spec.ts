import ProductRepository from "../repository/product.repository"
import ProductAdmFacade from "./product-adm.facade"
import AddProductUseCase from "../usecase/add-product/add-product.usecase"
import UpdateProductUseCase from "../usecase/update-product/update-product.usecase"
import Promo from "../domain/promo.entity"
import { transform } from "../../../util/transform"
import Price from "../domain/price.entity"
import Product from "../domain/product.entity"
import ProductAdmFactory from "../factory/product-adm.factory.facede"
import { AppDataSource } from "../repository/database/data-source"
import { ProductModel } from "../repository/product.model"
import DelProductUseCase from "../usecase/del-product/del-product.usecase"
import { Entity } from "typeorm"
import FindProductUseCase from "../usecase/find-product/find-product.usecase"
import GetPriceUseCase from "../usecase/get-price/get-price.usecase"

const auxRepo = AppDataSource.getMongoRepository(ProductModel)

const createProductInDb = async (entity: Product) => {
    const product = auxRepo.create({
        ...transform(entity, 'db'),
        price: entity.price.map(price => transform(price, 'db')),
    })

    await auxRepo.save(product)
}

describe("Product Adm Facade test", () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })
    
    afterEach(async () => {
        await AppDataSource.destroy()
    })

    it.skip("should create a product", async () => {
        // const productRepository = new ProductRepository()
        // const addProductUseCase = new AddProductUseCase(productRepository)
        // const facade = new ProductAdmFacade({
        //     addUseCase: addProductUseCase,
        //     stockUseCase: undefined,

        // })

        const facade = ProductAdmFactory.create()

        const input = {
            name: "Product #03",
            description: "Product Description #03",
            ableToSell: false,
            medias: ['media#03'],
            details: {
                atributo0: 'valor0',
                atributo1: 'valor1',
                atributo2: 'valor2',
            },
            price: [{
                label: '150cm',
                price: 98.66,
                stock: 547,
            }],
            promo: [{
                type: 'type',
                method: 'method'
            }]

        }
        
        await facade.addProduct(input)

        const productInDb = await auxRepo.findBy({
            name: input.name
        })

        expect(productInDb[0]).toBeDefined()
        expect(productInDb[0].id).toBeDefined()
        expect(productInDb[0].name).toBe(input.name)
        expect(productInDb[0].description).toBe(input.description)
        expect(productInDb[0].ableToSell).toBe(input.ableToSell)
        expect(Array.isArray(productInDb[0].medias)).toBe(true);
        expect(Array.isArray(productInDb[0].price)).toBe(true);
        expect(Array.isArray(productInDb[0].promo)).toBe(true);
        expect(typeof productInDb[0].details).toBe('object')
        expect(typeof productInDb[0].price).toBe('object')
        expect(typeof productInDb[0].promo).toBe('object')
    })

    it.skip("should check stock of a product", async () => {
        const facade = ProductAdmFactory.create()

        const product = new Product({
            name: 'Product #05',
            description: "Product Description #05",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#05'],
            price: [new Price({
                stock: 96,
                label: 'xs',
                price: 65.33
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })
        
        await createProductInDb(product)

        const input = {
            products: [
                {
                    productId: product.id,
                    priceId: product.price[0].id
                }
            ]
        }
        const output = await facade.checkStock(input)

        expect(output).toBeDefined()
        expect(output.products[0].priceId).toBe(product.price[0].id)
        expect(output.products[0].productId).toBe(product.id)
        expect(output.products[0].stock).toBeDefined()
    })

    it.skip("should check stock of a product with new parameter 'value'", async () => {
        //create product in db
        const product = new Product({
            name: 'Product #05',
            description: "Product Description #05",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#05'],
            price: [new Price({
                stock: 96,
                label: 'xs',
                price: 65.33
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })
        
        await createProductInDb(product)

        const facade = ProductAdmFactory.create()

        const input = {
            products: [
                {
                    productId: product.id,
                    priceId: product.price[0].id,
                    value: 55,
                }
            ]
        }
        const output = await facade.checkStock(input)

        expect(output).toBeDefined()
        expect(output.products[0].productId).toBe(product.id)
        expect(output.products[0].priceId).toBe(product.price[0].id)
        expect(output.products[0].stock).toBeDefined()
        expect(output.products[0].available).toBe(true)
    })

    it.skip("should update a product", async () => {
        //create product in db
        const product = new Product({
            name: 'Product #05',
            description: "Product Description #05",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#05'],
            price: [new Price({
                stock: 96,
                label: 'xs',
                price: 65.33
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })
        
        await createProductInDb(product)

        // const productRepository = new ProductRepository()
        // const updateProductUseCase = new UpdateProductUseCase(productRepository)
        // const facade = new ProductAdmFacade({
        //     addUseCase: undefined,
        //     stockUseCase: undefined,
        //     updateUseCase: updateProductUseCase 
        // })

        const facade = ProductAdmFactory.create()
        
        const input = {
            id: product.id,
            name: 'Product #06',
            description: "Product Description #06",
            details: { 
                atributo0: 'valor atualizado',
            },
        }

        const output = await facade.updateProduct(input)

        expect(output).toBeDefined()
        expect(output.id).toBe(product.id)
        expect(output.name != product.name).toBe(true)
        expect(output.description != product.description).toBe(true)
        expect(output.details['atributo0'] != product.details['atributo0']).toBe(true)
    })

    it.skip("should delete a product", async () => {
        //create product in db for test
        const product = new Product({
            name: 'Product #05',
            description: "Product Description #05",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#05'],
            price: [new Price({
                stock: 96,
                label: 'xs',
                price: 65.33
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })
        
        await createProductInDb(product)

        // const productRepository = new ProductRepository()
        // const delProductUseCase = new DelProductUseCase(productRepository)

        // const facade = new ProductAdmFacade({
        //     addUseCase: undefined,
        //     updateUseCase: undefined,
        //     stockUseCase: undefined,
        //     delProductUseCase: delProductUseCase,
        // })

        const facade = ProductAdmFactory.create()

        const input = {
            productId: product.id
        }

        const output = await facade.deleteProduct(input)

        expect(output).toBeDefined()
        expect(output.ok).toBe(true)

        const productInDb = await auxRepo.findBy({
            id: input.productId
        })

        expect(productInDb).toBeDefined()
        expect(productInDb.length === 0).toBe(true)
    })

    it.skip("should find a product", async () => {
        //create product in db for test
        const product = new Product({
            name: 'Product #05',
            description: "Product Description #05",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#05'],
            price: [new Price({
                stock: 96,
                label: 'xs',
                price: 65.33
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })
        
        await createProductInDb(product)

        // const repository = new ProductRepository()
        // const findProductUseCase = new FindProductUseCase(repository)
        // const facade = new ProductAdmFacade({
        //     addUseCase: undefined,
        //     updateUseCase: undefined,
        //     delProductUseCase: undefined,
        //     stockUseCase: undefined,
        //     findUseCase: findProductUseCase
        // })

        const facade = ProductAdmFactory.create()

        const input = {
            products: [
                {id: product.id}
            ]
        }

        const output = await facade.findProduct(input)

        expect(output).toBeDefined()
        expect(output.products[0].id).toBe(product.id)
        expect(output.products[0].name).toBe(product.name)
        expect(output.products[0].description).toBe(product.description)
        expect(output.products[0].ableToSell).toBe(product.ableToSell)
    })

    it.skip("should get prices from products", async () => {
        const product0 = new Product({
            name: 'Product #07',
            description: "Product Description #07",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#07'],
            price: [new Price({
                stock: 66,
                label: 'gg',
                price: 85.33
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })

        const product = new Product({
            name: 'Product #08',
            description: "Product Description #08",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#08'],
            price: [new Price({
                stock: 66,
                label: 'gg',
                price: 85.33
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })
        
        await createProductInDb(product0)
        await createProductInDb(product)

        const repository = new ProductRepository()
        const getPriceUseCase = new GetPriceUseCase(repository)
        const facade = new ProductAdmFacade({
            getPriceUseCase,
            addUseCase: undefined,
            updateUseCase: undefined,
            delProductUseCase: undefined,
            stockUseCase: undefined,
            findUseCase: undefined
        })

        const input = {
            products: [
                {
                    id: product0.id,
                    priceId: product0.price[0].id
                },
                {
                    id: product.id,
                    priceId: product.price[0].id
                }
            ]
        }
        const pricesId = input.products.map(item => item.priceId) 
        const productsId = input.products.map(item => item.id) 

        const output = await facade.getPrice(input)

        expect(output.prices).toBeDefined()
        expect(Array.isArray(output.prices)).toBe(true)
        expect(output.prices.filter(el => pricesId.includes(el.id)).length === 2).toBe(true)
        expect(output.prices.filter(el => productsId.includes(el.productId)).length === 2).toBe(true)
    })
})