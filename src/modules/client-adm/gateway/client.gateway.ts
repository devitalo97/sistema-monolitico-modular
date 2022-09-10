import Client from "../domain/client.entity";

export interface ClientGateway{
    add(input: Client): Promise<void>,
    find(input: {id?: string, name?: string, email?: string}): Promise<Client[]>,
}