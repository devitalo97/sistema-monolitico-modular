import AddItemUseCase from "./add-item.usecase"
import { v4 as uuidv4 } from 'uuid'

const MockRepository = () => {
    return {
        addItem: jest.fn(),
        create: jest.fn(),
        remItem: jest.fn(),
        find: jest.fn(),
        remItemDeleted: jest.fn(),

    }
}

describe("Add item unit test", () => {
    it("should add a item", async () => {
        //repositorio
        const repository = MockRepository()
        //usecase
        const usecase = new AddItemUseCase(repository)
        //input
        const items = [
            {
                productId: uuidv4(),
            },
            {
                productId: uuidv4(),
            }
        ]
        const storeId = uuidv4()
        //comecar daqui. testar a adicao de um item numa loja
        //executar o usecase
        const output = await usecase.execute({items, storeId: storeId})
        //expect
        expect(repository.addItem).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.storeId).toBeDefined()
        expect(output.storeId).toBe(storeId)
        expect(output.ok).toBe(true)
    })
})