import { v4 as uuidv4 } from 'uuid'
import { AppDataSource } from "./database/data-source"
import Store from "../domain/store.entity"
import StoreRepository from './store.repository'
import { StoreModel } from './store.model'
import Item from '../domain/item.entity'
import { transform } from '../../../util/transform'

const auxRepo = AppDataSource.getMongoRepository(StoreModel)

const createStoreInDb = async (entity: Store) => {
    const store = auxRepo.create({
        ...transform(entity, 'db'),
        items: entity.items.map(item => transform(item, 'db')),
    })
    await auxRepo.save(store)
}

describe("Stock Repository Test", () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })
    afterEach(async () => {
        await AppDataSource.destroy()
    })

    it.skip("should create a store", async () => {
        const store = new Store({
            items: [
                new Item({
                    productId: uuidv4(),
                })
            ]
        })

        const repository = new StoreRepository()
        await repository.create(store)

        const storeInDb = await auxRepo.findBy({
            id: store.id
        })

        expect(storeInDb).toBeDefined()
        expect(storeInDb.length === 1).toBe(true)
        expect(storeInDb[0].id).toBeDefined()
        expect(storeInDb[0].id).toBe(store.id)
        expect(Array.isArray(storeInDb[0].items)).toBe(true)
        expect(typeof storeInDb[0].items[0]).toBe('object')
    })

    it.skip("should add item in store", async () => {
        const store = new Store({
            items: [
                new Item({
                    productId: uuidv4(),
                }),
                new Item({
                    productId: uuidv4(),
                }),
                new Item({
                    productId: uuidv4(),
                })
            ]
        })

        await createStoreInDb(store)

        const repository = new StoreRepository()
        await repository.addItem({items: store.items, storeId: store.id})

        const storeInDb = await auxRepo.findBy({
            id: store.id
        })

        const itemsIdList = store.items.map(item => item.id)

        expect(storeInDb).toBeDefined()
        expect(storeInDb[0].items.length >= store.items.length).toBe(true)
        expect(storeInDb[0].items.filter(item => itemsIdList.includes(item.id)).length >= 3).toBe(true)
    })

    it.skip("should remove item from  store", async () => {
        const items = [
            new Item({
                id: uuidv4(),
                productId: uuidv4(),
            }),
            new Item({
                id: uuidv4(),
                productId: uuidv4(),
            }),
            new Item({
                id: uuidv4(),
                productId: uuidv4(),
            })
        ]
        const store = new Store({
            id: uuidv4(), 
            items: [...items, new Item({
                id: uuidv4(),
                productId: uuidv4(),
            })]
        })

        await createStoreInDb(store)

        const repository = new StoreRepository()
        await repository.remItem({items, storeId: store.id})

        const storeInDb = await auxRepo.findBy({
            id: store.id
        })

        const itemsIdList = items.map(item => item.id)

        expect(storeInDb).toBeDefined()
        expect(storeInDb[0].items.length <= items.length).toBe(true)
        expect(storeInDb[0].items.filter(item => itemsIdList.includes(item.id)).length === 0).toBe(true)
    })

    it.skip("should find a store", async () => {
        //criacao de store para o teste
        const store = new Store({
            items: [
                new Item({
                    productId: uuidv4()
                })
            ]
        })

        await createStoreInDb(store)
        //repositorio
        const repository = new StoreRepository()

        //input 
        const input = {
            id: store.id
        }

        const output = await repository.find(input) 

        expect(output).toBeDefined()
        expect(output.length == 1).toBe(true)
        expect(output[0]).toBeInstanceOf(Store)
        
    })

    it.skip("should rem item deleted", async () => {
        const products = [uuidv4(), uuidv4()]
        const store = new Store({
            items: [
                ...products.map(prod => new Item({productId:prod}))
            ]
        })

        await createStoreInDb(store)
        await createStoreInDb(store)

        const storeBeforeItemDeleted = await auxRepo.findBy({
            id: store.id
        })
        
        const input = {
            productId: products[0]
        }

        const storeRepository = new StoreRepository()

        await storeRepository.remItemDeleted(input)

        const storeAfterItemDeleted = await auxRepo.findBy({
            id: store.id
        })

        expect(storeBeforeItemDeleted).toBeDefined()
        expect(storeBeforeItemDeleted.length > 0).toBe(true)
        expect(storeBeforeItemDeleted[0].items.length === 2).toBe(true)
        
        expect(storeAfterItemDeleted).toBeDefined()
        expect(storeAfterItemDeleted.length > 0).toBe(true)
        expect(storeAfterItemDeleted[0].items.length === 1).toBe(true)

        expect(storeBeforeItemDeleted[0].items.length !== storeAfterItemDeleted[0].items.length).toBe(true)
    })
})