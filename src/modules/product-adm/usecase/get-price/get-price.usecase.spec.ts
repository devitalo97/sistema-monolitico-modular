import { v4 as uuidv4 } from 'uuid'
import Price from '../../domain/price.entity'
import Product from '../../domain/product.entity'
import Promo from '../../domain/promo.entity'
import GetPriceUseCase from './get-price.usecase'

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
    promo: [
        new Promo({
            type: 'type',
            method: 'method'
        })
    ]
})

const product0 = new Product({
    name: 'Product #06',
    description: "Product Description #06",
    ableToSell: false,
    medias: ["media#00", 'media#01', 'media#06'],
    price: [new Price({
        stock: 99,
        label: 'gg',
        price: 88.33
    })],
    details: { 
        atributo0: 'valor',
        atributo1: 'valor',
    },
    promo: [
        new Promo({
            type: 'type',
            method: 'method'
        })
    ]
})

const MockRepository = () => {
    return {
        findByIds: jest.fn().mockReturnValue(Promise.resolve([product, product0])),
        add: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        find: jest.fn()
    }
}

describe("get price usecase unit test", () => {
    it("should get a price from product", async () => {
        //repository
        const repository = MockRepository()

        //usecase
        const usecase = new GetPriceUseCase(repository)

        const input = {
            products: [
                {
                    id: product.id,
                    priceId: product.price[0].id
                },
                {
                    id: product0.id,
                    priceId: product0.price[0].id
                }
            ]
        }

        const pricesId = input.products.map(item => item.priceId) 
        const productsId = input.products.map(item => item.id) 

        const output = await usecase.execute(input)
        
        expect(repository.findByIds).toHaveBeenCalled()
        expect(output.prices).toBeDefined()
        expect(Array.isArray(output.prices)).toBe(true)
        expect(output.prices.filter(el => pricesId.includes(el.id)).length === 2).toBe(true)
        expect(output.prices.filter(el => productsId.includes(el.productId)).length === 2).toBe(true)
    })
})