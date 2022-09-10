import { transformEntityData } from "../../../util/transformEntityData"
import Address from "../../@shared/domain/value-object/address.value-object"
import Client from "../domain/client.entity"
import ClientFactory from "../factory/client-adm.factory.facade"
import { ClientModel } from "../repository/client.model"
import ClientRepository from "../repository/client.repository"
import { AppDataSource } from "../repository/database/data-source"
import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import FindClientUseCase from "../usecase/find-client/find-client.usecase"
import ClientFacade from "./client-adm.facade"

const auxRepo = AppDataSource.getMongoRepository(ClientModel)

const createClientInDb = async (entity: Client) => {
    const clientCreated = auxRepo.create({
        ...transformEntityData(entity, 'db'),
        address: transformEntityData(entity.address, 'db')
    })
    await auxRepo.save(clientCreated)
}

describe("client facade test", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
    })
    afterAll(async () => {
        await AppDataSource.destroy()
    })

    it("should find a client", async () => {
        const client = new Client({
            name: 'Bruna',
            email: 'bruna@mail.com',
            password: '123456@',
            document: 'document',
            address: new Address({
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            })
        })

        await createClientInDb(client)

        // const repository = new ClientRepository()
        // const findClientUseCase = new FindClientUseCase(repository)

        // const facade = new ClientFacade({
        //     findClientUseCase,
        //     addClientUseCase: undefined
        // })
        
        const facade = ClientFactory.create()

        const input = {
            id: client.id,
            email: client.email,
        }

        const output = await facade.findClient(input)

        expect(output).toBeDefined()
        expect(output.clients[0].id).toBe(client.id)
        expect(output.clients[0].name).toBe(client.name)
        expect(output.clients[0].email).toBe(client.email)
        expect(output.clients[0].password).toBe(client.password)
        expect(output.clients[0].document).toBe(client.document)
        expect(output.clients[0].address.state).toBe(client.address.state)
        expect(output.clients[0].address.city).toBe(client.address.city)
        expect(output.clients[0].address.street).toBe(client.address.street)
        expect(output.clients[0].address.number).toBe(client.address.number)
        expect(output.clients[0].address.complement).toBe(client.address.complement)
        expect(output.clients[0].address.zipCode).toBe(client.address.zipCode)
    })

    it("should add a client", async () => {
        const input = {
            name: 'teste#8547',
            email: "teste@mail.com",
            document: 'document',
            address: {
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            }
        }

        // const repository = new ClientRepository()

        // const addClientUseCase = new AddClientUseCase(repository)

        // const facade = new ClientFacade({
        //     findClientUseCase: undefined,
        //     addClientUseCase
        // })

        const facade = ClientFactory.create()
        const output = await facade.addClient(input)

        expect(output).toBeDefined()
        expect(output.ok).toBe(true)

        const clientInDb = await auxRepo.findBy({
            name: input.name
        })

        expect(clientInDb[0]).toBeDefined()
        expect(clientInDb[0].id).toBeDefined()
        expect(clientInDb[0].name).toBe(input.name)
        expect(clientInDb[0].email).toBe(input.email)
        expect(clientInDb[0].password).toBeDefined()
        expect(clientInDb[0].document).toBe(input.document)
        expect(clientInDb[0].address.state).toBe(input.address.state)
        expect(clientInDb[0].address.city).toBe(input.address.city)
        expect(clientInDb[0].address.street).toBe(input.address.street)
        expect(clientInDb[0].address.number).toBe(input.address.number)
        expect(clientInDb[0].address.complement).toBe(input.address.complement)
        expect(clientInDb[0].address.zipCode).toBe(input.address.zipCode)
    })
})

