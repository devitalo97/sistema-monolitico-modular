import ClientFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientFactory{
    static create(){
        const repository = new ClientRepository()
        const findClientUseCase = new FindClientUseCase(repository)
        const addClientUseCase = new AddClientUseCase(repository)
        const facade = new ClientFacade({
            findClientUseCase,
            addClientUseCase
        })
        return facade
    }
}