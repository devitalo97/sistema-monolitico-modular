import { transform } from "../../../util/transform";
import Address from "../../@shared/domain/value-object/address.value-object";
import Client from "../domain/client.entity";
import { ClientGateway } from "../gateway/client.gateway";
import { ClientModel } from "./client.model";
import * as DTO from './client.repository.dto'
import { AppDataSource } from "./database/data-source";

export default class ClientRepository implements ClientGateway{
    private _repository

    constructor(){
        this._repository = AppDataSource.getMongoRepository(ClientModel)
    }
    
    async find(input: DTO.FindClientRepositoryInputDto): Promise<Client[]>{
        return (await this._repository.findBy({...input}))
            .map(client => new Client({
                ...client,
                address: new Address({...client.address})
            }))
    }

    async add(input: Client){
        const client = this._repository.create({
            ...transform(input, 'db'),
            address: transform(input.address, 'db')
        })
        await this._repository.save(client)
    }
}