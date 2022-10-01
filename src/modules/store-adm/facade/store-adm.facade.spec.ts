import StoreRepository from "../repository/store.repository"
import StoreFacade from "./store-adm.facade"
import AddItemStoreUseCase from "../usecase/add-item/add-item.usecase"
import RemItemStoreUseCase from "../usecase/rem-item/rem-item.usecase"
import CreateStoreUseCase from "../usecase/create-store/create-store.usecase"
import FindStoreUseCase from "../usecase/find-store/find-store.usecase"
import { v4 as uuidv4 } from 'uuid'
import ItemEntity from "../domain/item.entity"
import StoreEntity from "../domain/store.entity"
import { AppDataSource } from "../repository/database/data-source"
import { StoreModel } from "../repository/store.model"
import { transform } from "../../../util/transform"
import StoreFactory from "../factory/store-adm.factory.facade"
import RemItemDeletedUseCase from "../usecase/rem-item-deleted/rem-item-deleted.usecase"

interface ItemProps {
    id: string,
    productId: string,
}

const auxRepo = AppDataSource.getMongoRepository(StoreModel)

const createStoreInDb = async (entity: StoreEntity) => {
    const store = auxRepo.create({
        ...transform(entity, 'db'),
        items: entity.items.map(item => transform(item, 'db')),
    })
    await auxRepo.save(store)
}


describe("Store Adm facade test", () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })
    
    afterEach(async () => {
        await AppDataSource.destroy()
    })
    it.skip("should create a store", async () => {
        //repositorio
        // const storeRepository = new StoreRepository()
        // //caso de uso
        // const createStoreUseCase = new CreateStoreUseCase(storeRepository)
        // const facade = new StoreFacade({
        //     createStoreUseCase,
        //     addItemStoreUseCase: undefined
        // })

        const facade = StoreFactory.create()

        //input
        const items = [
            {
                productId: uuidv4(),
            },
            {
                productId: uuidv4(),
            }
        ]

        const output = await facade.createStore({items})

        //output
        expect(output).toBeDefined()
        expect(output.id).toBeDefined()
        expect(output.ok).toBe(true)

        const storeInDb = await auxRepo.findBy({
            id: output.id
        })

        expect(storeInDb).toBeDefined()
        expect(storeInDb.length).toBe(1)
        expect(storeInDb[0].id).toBe(output.id)
        expect(storeInDb[0].items.length >= items.length).toBe(true)

    })

    it.skip("should add items a store", async () => {
        //create store in db for test
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

        await createStoreInDb(store)
        //repositorio
        // const storeRepository = new StoreRepository()
        // //caso de uso
        // const addItemStoreUseCase = new AddItemStoreUseCase(storeRepository)
        // const storeFacade = new StoreFacade({
        //     createStoreUseCase: undefined,
        //     addItemStoreUseCase
        // })

        const storeFacade = StoreFactory.create()

        const itemsToAdd = [
            {
                productId: uuidv4(),
            },
            {
                productId: uuidv4(),
            }
        ]

        const output = await storeFacade.addItem({items: itemsToAdd, storeId: store.id})

        expect(output).toBeDefined()
        expect(output.storeId).toBe(store.id)
        expect(output.ok).toBe(true)

        const storeInDb = await auxRepo.findBy({
            id: store.id
        })

        
        expect(storeInDb).toBeDefined()
        expect(storeInDb.length != 0).toBe(true)
        expect(storeInDb[0].items.length === 4).toBe(true)

    })

    it.skip("should remove item from store", async () => {
        //create store in db for test
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

        await createStoreInDb(store)



        // // repositorio
        // const storeRepository = new StoreRepository()
        // // usecase
        // const remItemStoreUseCase = new RemItemStoreUseCase(storeRepository)
        // // facade
        // const facade = new StoreFacade({
        //     remItemStoreUseCase,
        //     addItemStoreUseCase: undefined,
        //     createStoreUseCase: undefined
        // })

        const facade = StoreFactory.create()

        //input
        const itemsToRem = store.items.map(item => transform(item, 'db')) as ItemProps[]

        const oputput = await facade.remItem({items: itemsToRem, storeId: store.id})

        // output
        expect(oputput).toBeDefined()
        expect(oputput.storeId).toBe(store.id)
        expect(oputput.ok).toBe(true)


        const storeInDb = await auxRepo.findBy({
            id: store.id
        })

        const itemsIdList = itemsToRem.map(item => item.id)
        
        expect(storeInDb).toBeDefined()
        expect(storeInDb.length >= 0).toBe(true)
        expect(storeInDb[0]?.items.filter(item => itemsIdList.includes(item.id)).length == 0).toBe(true)

    })

    it.skip("should find store", async () => {
        //create store in db for test
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

        await createStoreInDb(store)


        // const storeRepository = new StoreRepository()
        // const findStoreUseCase = new FindStoreUseCase(storeRepository)

        // const storeFacade = new StoreFacade({
        //     createStoreUseCase: undefined,
        //     addItemStoreUseCase: undefined,
        //     remItemStoreUseCase: undefined,
        //     findStoreUseCase: findStoreUseCase
        // })

        const facade = StoreFactory.create()

        const input = {
            id: store.id
        }

        const output = await facade.findStore(input)

        expect(output).toBeDefined()
        expect(output.stores[0].id).toBe(input.id)
    })

    it.skip("should remove item deleted from store", async () => {
        //create store for test
        const products = [uuidv4(), uuidv4()]
        const store = new StoreEntity({
            items: [
                ...products.map(prod => new ItemEntity({productId:prod}))
            ]
        })

        const storesCreated = await auxRepo.create([{
            ...transform(store, 'db'),
            items: store?.items?.map(item => transform(item, 'db'))
        }, {
            ...transform(store, 'db'),
            items: store?.items?.map(item => transform(item, 'db'))
        }])

        await auxRepo.save(storesCreated)

        // const storeRepository = new StoreRepository()
        // const remItemDeletedUseCase = new RemItemDeletedUseCase(storeRepository)
        // const facade = new StoreFacade({
        //     createStoreUseCase: undefined,
        //     addItemStoreUseCase: undefined,
        //     remItemStoreUseCase: undefined,
        //     findStoreUsecase: undefined,
        //     remItemDeletedUseCase: remItemDeletedUseCase,
        // })
        const facade = StoreFactory.create()

        const input = {
            productId: products[0]
        }

        const output = await facade.remItemDeleted(input)

        expect(output.ok).toBe(true)

        const storeInDb = await auxRepo.findBy({
            id: store.id
        })

        
        expect(storeInDb).toBeDefined()
        expect(storeInDb.length >= 0).toBe(true)
        expect(storeInDb[0]?.items.filter(item => item.productId === input.productId).length === 0).toBe(true)
    })

})

// 1: aloca espaço na memória
// 2: instancia a classe
// 3: inicializa as variavies da instancia com os valores padrões e em seguida executa o construtor