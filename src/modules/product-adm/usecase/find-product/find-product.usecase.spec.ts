import Price from "../../domain/price.entity"
import Product from "../../domain/product.entity"
import Promo from "../../domain/promo.entity"
import FindProductUseCase from "./find-product.usecase"

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

const MockRepository = () => {
    return {
        find: jest.fn(),
        add: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findByIds: jest.fn().mockReturnValue(Promise.resolve([product]))
    }
}

describe("find product usecase unit test", () => {
    it.skip("should find products", async () => {
        //repository
        const repository = MockRepository()
        //usecase
        const usecase = new FindProductUseCase(repository)
        //input
        const input = {
            products: [
                {id: product.id}
            ]
        }
        //output
        const output = await usecase.execute(input)

        expect(repository.findByIds).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.products[0].id).toBe(product.id)
        expect(output.products[0].name).toBe(product.name)
        expect(output.products[0].description).toBe(product.description)
        expect(output.products[0].ableToSell).toBe(product.ableToSell)
    })
})