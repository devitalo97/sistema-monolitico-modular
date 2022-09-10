import Price from "../../domain/price.entity"
import Product from "../../domain/product.entity"
import UpdateProductUseCase from "./update-product.usecase"

const product = new Product({
    name: "product name #05",
    description: "product description #05",
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
        update: jest.fn().mockReturnValue(
            new Product({
                id: product.id,
                name: "product name #06",
                description: "product description #06",
                price: [new Price({
                    label: '50cm²',
                    stock: 98,
                    price: 55,
                })],
                details: {
                    atributo0: 'valor0',
                    atributo1: 'valor1',
                },
                medias: ["media#00"],
                ableToSell: false
            })
        ),
        delete: jest.fn(),
        findByIds: jest.fn()
    }
}

describe("Update Product unit test", () => {
    it("should update a product", async () => {
        //repository
        const repository = MockRepository()

        const usecase = new UpdateProductUseCase(repository)

        const input = {
            id: product.id,
            name: "product name #06",
            description: "product description #06",
            price: [new Price({
                label: '50cm²',
                stock: 98,
                price: 55,
            })]
        }

        const output = await usecase.execute(input)

        expect(repository.update).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(Array.isArray(output.price)).toBe(true)
        expect(output.price[0]).toBeInstanceOf(Price)

        expect(product.id).toBe(output.id)
        expect(product.name != output.name).toBe(true)
        expect(product.description != output.description).toBe(true)
    })
})