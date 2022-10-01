import { v4 as uuidv4 } from 'uuid'
import DelProductUseCase from './del-product.usecase'
const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findByIds: jest.fn()

    }
}
describe("delete product unit test", () => {
    it.skip("should delete a product", async () => {
        //repository
        const productRepository = MockRepository()

        //usecase
        const usecase = new DelProductUseCase(productRepository)

        //input
        const input = {
            productId: uuidv4()
        }

        const output = await usecase.execute(input)

        expect(productRepository.delete).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.ok).toBe(true)
    })
})