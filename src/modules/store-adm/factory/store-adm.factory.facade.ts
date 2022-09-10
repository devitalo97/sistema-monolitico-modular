import StoreFacade from "../facade/store-adm.facade";
import StoreRepository from "../repository/store.repository";
import AddItemStoreUseCase from "../usecase/add-item/add-item.usecase";
import CreateStoreUseCase from "../usecase/create-store/create-store.usecase";
import FindStoreUseCase from "../usecase/find-store/find-store.usecase";
import RemItemDeletedUseCase from "../usecase/rem-item-deleted/rem-item-deleted.usecase";
import RemItemStoreUseCase from '../usecase/rem-item/rem-item.usecase'
export default class StoreFactory {
    static create(): StoreFacade {
        
        const repository = new StoreRepository()
        
        const addItemStoreUseCase = new AddItemStoreUseCase(repository)
        const remItemStoreUseCase = new RemItemStoreUseCase(repository)
        const createStoreUseCase = new CreateStoreUseCase(repository)
        const findStoreUseCase = new FindStoreUseCase(repository)
        const remItemDeletedUseCase = new RemItemDeletedUseCase(repository)

        const facade = new StoreFacade({
            addItemStoreUseCase,
            createStoreUseCase,
            remItemStoreUseCase,
            findStoreUseCase,
            remItemDeletedUseCase
        })

        return facade
    }
}