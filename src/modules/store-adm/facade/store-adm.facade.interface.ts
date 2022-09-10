import StoreEntity from '../domain/store.entity'
import * as DTO from './store-adm.facade.dto'

export default interface StoreAdmFacadeInterface {
    addItem(input: DTO.AddItemStoreAdmFacadeInputDto):Promise<DTO.AddItemStoreAdmFacadeOutputDto>
    remItem(input: DTO.RemItemStoreAdmFacadeInputDto):Promise<DTO.RemItemStoreAdmFacadeOutputDto>
    createStore(input: DTO.CreateStoreAdmFacadeInputDto):Promise<DTO.CreateStoreAdmFacadeOutputDto>
    findStore(input: DTO.FindStoreAdmFacadeInputDto):Promise<DTO.FindStoreAdmFacadeOutputDto>
    remItemDeleted(input: DTO.RemItemDeletedStoreAdmFacadeInputDto):Promise<DTO.RemItemDeletedStoreAdmFacadeOutputDto>
}