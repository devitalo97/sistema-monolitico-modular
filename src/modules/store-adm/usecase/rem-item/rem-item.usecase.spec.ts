import { v4 as uuidv4 } from 'uuid'
import RemItemStoreUsecase from './rem-item.usecase'

const MockRepository = () => {
    return {
        addItem: jest.fn(),
        create: jest.fn(),
        remItem: jest.fn(),
        find: jest.fn(),
        remItemDeleted: jest.fn(),
    }
}
describe("Remove Item unit test", () => {
    it("should rem item from store", async () => {
        //repositorio
        const repository = MockRepository()

        //usecase
        const usecase = new RemItemStoreUsecase(repository)

        //input
        const items = [
            {
                id: uuidv4(),
                productId: uuidv4(),
            },
            {
                id: uuidv4(),
                productId: uuidv4(),
            }
        ]
        const storeId = uuidv4()

        const output = await usecase.execute({items, storeId})

        expect(repository.remItem).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.ok).toBe(true)
        expect(output.storeId).toBe(storeId)
    })
})