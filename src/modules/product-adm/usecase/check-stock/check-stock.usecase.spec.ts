import Price from "../../domain/price.entity"
import Product from "../../domain/product.entity"
import CheckStockUseCase from "./check-stock.usecase"

const product = new Product({
    name: "product name # 04",
    description: "product description #04",
    ableToSell: false,
    details: {
        atributo0: 'valor0',
        atributo1: 'valor1',
    },
    medias: ["media#00"],
    price: [new Price({
        label: '15cm²',
        stock: 20,
        price: 85,
    })]
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findByIds: jest.fn().mockReturnValue(Promise.resolve([product])),
    }
}

describe('Check Stock Use Case unit test', () => {
    it("should check a stock number of product", async () => {
        // repositorio
        const repository = MockRepository()
        // caso de uso
        const usecase = new CheckStockUseCase(repository)
        // input
        const input = {
            products: [
                {
                    productId: product.id,
                    priceId: product.price[0].id
                }
            ]
        }
        // executar o caso de uso
        const output = await usecase.execute(input)

        // expect
        expect(repository.findByIds).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.products[0].productId).toBe(input.products[0].productId)
        expect(output.products[0].priceId).toBe(input.products[0].priceId)
        expect(output.products[0].stock).toBeDefined()
    })

    it("should check a stock number of product with new parameter 'value'", async () => {
        // repositorio
        const repository = MockRepository()
        // caso de uso
        const usecase = new CheckStockUseCase(repository)
        // input
        const input = {
            products: [
                {
                    productId: product.id,
                    priceId: product.price[0].id,
                    value: 160
                }
            ]
        }
        // executar o caso de uso
        const output = await usecase.execute(input)
        // expect
        expect(repository.findByIds).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.products[0].productId).toBe(input.products[0].productId)
        expect(output.products[0].priceId).toBe(input.products[0].priceId)
        expect(output.products[0].stock).toBeDefined()
        expect(output.products[0].available).toBe(false)
    })
})