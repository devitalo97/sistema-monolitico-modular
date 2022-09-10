import { ClientFacadeInterface } from "./client-adm.facade.interface";
import * as DTO from './client-adm.facade.dto'
import UseCaseInterface from "../../@shared/usecase/usecase.interface";

type UseCasesProps = {
    addClientUseCase: UseCaseInterface,
    findClientUseCase: UseCaseInterface,
}

export default class ClientFacade implements ClientFacadeInterface {
    private _addClientUseCase: UseCaseInterface
    private _findClientUseCase: UseCaseInterface
    
    constructor(props: UseCasesProps){
        this._addClientUseCase = props.addClientUseCase
        this._findClientUseCase = props.findClientUseCase
    }

    async addClient(input: DTO.AddClientFacadeInputDto): Promise<DTO.AddClientFacadeOutputDto>{
        return await this._addClientUseCase.execute(input)
    }
    async findClient(input: DTO.FindClientFacadeInputDto): Promise<DTO.FindClientFacadeOutputDto>{
        return await this._findClientUseCase.execute(input) 
    }
}