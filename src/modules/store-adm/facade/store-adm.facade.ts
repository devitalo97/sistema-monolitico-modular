import * as DTO from './store-adm.facade.dto' 
import StoreAdmFacadeInterface from "./store-adm.facade.interface";
import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import StoreEntity from '../domain/store.entity';

type UseCasesProps = {
    addItemStoreUseCase: UseCaseInterface,
    remItemStoreUseCase: UseCaseInterface,
    createStoreUseCase: UseCaseInterface,
    findStoreUseCase: UseCaseInterface,
    remItemDeletedUseCase: UseCaseInterface,
}

export default class StoreFacade implements StoreAdmFacadeInterface {
    private _addItemStoreUseCase
    private _remItemStoreUseCase
    private _createStoreUseCase
    private _findStoreUseCase
    private _remItemDeletedUseCase

    constructor(props: UseCasesProps){
        this._addItemStoreUseCase = props.addItemStoreUseCase
        this._createStoreUseCase = props.createStoreUseCase
        this._remItemStoreUseCase = props.remItemStoreUseCase
        this._findStoreUseCase = props.findStoreUseCase
        this._remItemDeletedUseCase = props.remItemDeletedUseCase
    }

    async addItem(input: DTO.AddItemStoreAdmFacadeInputDto): Promise<DTO.AddItemStoreAdmFacadeOutputDto> {
        return await this._addItemStoreUseCase.execute(input)
    }
    async remItem(input: DTO.RemItemStoreAdmFacadeInputDto): Promise<DTO.RemItemStoreAdmFacadeOutputDto> {
        return await this._remItemStoreUseCase.execute(input)
    }
    async createStore(input: DTO.CreateStoreAdmFacadeInputDto): Promise<DTO.CreateStoreAdmFacadeOutputDto> {
        return await this._createStoreUseCase.execute(input)
    }
    async findStore(input: DTO.FindStoreAdmFacadeInputDto): Promise<DTO.FindStoreAdmFacadeOutputDto> {
        return await this._findStoreUseCase.execute(input)
    }
    async remItemDeleted(input: DTO.RemItemDeletedStoreAdmFacadeInputDto): Promise<DTO.RemItemDeletedStoreAdmFacadeOutputDto> {
        return await this._remItemDeletedUseCase.execute(input)
    }
}