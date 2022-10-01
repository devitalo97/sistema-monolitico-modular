import { v4 as uuidv4 } from 'uuid'
import RemItemDeletedUseCase from './rem-item-deleted.usecase'

const MockRepository = () => {
    return {
        addItem: jest.fn(),
        create: jest.fn(),
        remItem: jest.fn(),
        find: jest.fn(),
        remItemDeleted: jest.fn()
    }
}
describe("Remove Item Deleted unit test", () => {
    it.skip("should remove item deleted", async () => {
        //repository
        const repository = MockRepository()
        //usecase
        const usecase = new RemItemDeletedUseCase(repository)
        //input
        const input = {
            productId: uuidv4()
        }

        //output
        const output = await usecase.execute(input)

        expect(output).toBeDefined()
        expect(output.ok).toBe(true)
    })
})