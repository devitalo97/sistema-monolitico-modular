import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { ClientGateway } from "../../gateway/client.gateway";
import * as DTO from './find-client.usecase.dto'

export default class FindClientUseCase implements UseCaseInterface {
    private _repository: ClientGateway

    constructor(repository: ClientGateway){
        this._repository = repository
    }

    async execute(input: DTO.FindClientUseCaseInputDto): Promise<DTO.FindClientUseCaseOutputDto> {
        const clients = (await this._repository.find(input))?.map(client => ({
            id: client.id,
            name: client.name,
            email: client.email,
            password: client.password,
            document: client.document,
            address: client.address
        }))
        return {clients}
    }
}