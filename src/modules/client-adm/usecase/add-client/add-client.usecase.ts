import Address from "../../../@shared/domain/value-object/address.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import { ClientGateway } from "../../gateway/client.gateway";
import * as DTO from './add-client.usecase.dto'

export default class AddClientUseCase implements UseCaseInterface {
    private _repository: ClientGateway

    constructor(repository: ClientGateway){
        this._repository = repository
    }
    
    async execute(input: DTO.AddClientUseCaseInputDto): Promise<DTO.AddClientUseCaseOutputDto> {
        const client = new Client({
            ...input,
            address: new Address({...input.address})
        })
        await this._repository.add(client)
        return {
            ok: true
        }
    }
}