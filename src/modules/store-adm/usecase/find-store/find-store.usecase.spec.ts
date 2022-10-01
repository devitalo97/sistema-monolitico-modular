import ItemEntity from "../../domain/item.entity"
import StoreEntity from "../../domain/store.entity"
import { v4 as uuidv4 } from 'uuid' 
import FindStoreUseCase from "./find-store.usecase"

const store = new StoreEntity({
    items: [
        new ItemEntity({
            productId: uuidv4(),
        }),
        new ItemEntity({
            productId: uuidv4(),
        })
    ]
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve([store])),
        addItem: jest.fn(),
        remItem: jest.fn(),
        create: jest.fn(),
        remItemDeleted: jest.fn(),

    }
}
describe("Find Store unit test", () => {
    it.skip("should Find a store by id", async () => {
        //repository
        const repository = MockRepository()

        //usecase
        const usecase = new FindStoreUseCase(repository)

        //input 
        const input = {
            id: store.id
        }

        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.stores[0].id).toBeDefined()
        expect(output.stores[0].id).toBe(input.id)
        expect(output.stores[0].items.length == 2).toBe(true)
    })
})