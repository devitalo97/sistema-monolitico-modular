import { v4 as uuidv4 } from 'uuid'
import CreateStoreUseCase from './create-store.usecase'

const MockRepository = () => {
    return {
        addItem: jest.fn(),
        create: jest.fn(),
        remItem: jest.fn(),
        find: jest.fn(),
        remItemDeleted: jest.fn(),

    }
}

describe("Create Store Unit Test", () => {
    it.skip("should create a store", async () => {
        const repository = MockRepository()

        const usecase = new CreateStoreUseCase(repository)

        const items = [
            {
                productId: uuidv4(),
            },
            {
                productId: uuidv4(),
            }
        ]

        const output = await usecase.execute({items})

        expect(repository.create).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.ok).toBe(true)
    })
})