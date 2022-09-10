import { transformEntityData } from "../../../util/transformEntityData"
import Address from "../../@shared/domain/value-object/address.value-object"
import Client from "../domain/client.entity"
import { ClientModel } from "./client.model"
import ClientRepository from "./client.repository"
import { AppDataSource } from "./database/data-source"

const auxRepo = AppDataSource.getRepository(ClientModel)

const createClientInDb = async (entity: Client) => {
    const clientCreated = auxRepo.create({
        ...transformEntityData(entity, 'db'),
        address: transformEntityData(entity.address, 'db')
    })

    await auxRepo.save(clientCreated)
}

describe("client repository test", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
    })
    afterAll(async () => {
        await AppDataSource.destroy()
    })
    
    it("should find a client", async () => {
        //create client for help test
        const client = new Client({
            name: 'Italo de Souza',
            email: 'italosouza@mail.com',
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

        //repository
        const repository = new ClientRepository()

        const input = {
            id: client.id,
            name: client.name
        }
        
        const output = await repository.find(input)


        expect(output).toBeDefined()
        expect(output[0]).toBeInstanceOf(Client)
        expect(output[0].id).toBe(client.id)
        expect(output[0].name).toBe(client.name)
        expect(output[0].document).toBe(client.document)
        expect(output[0].email).toBe(client.email)
        expect(output[0].password).toBe(client.password)
        expect(output[0].address.state).toBe(client.address.state)
        expect(output[0].address.city).toBe(client.address.city)
        expect(output[0].address.street).toBe(client.address.street)
        expect(output[0].address.number).toBe(client.address.number)
        expect(output[0].address.complement).toBe(client.address.complement)
        expect(output[0].address.zipCode).toBe(client.address.zipCode)
    })

    it("should add a client", async () => {
        const client = new Client({
            name: 'Italo Colombi',
            email: 'italocolombi@mail.com',
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

        const repository = new ClientRepository()
        await repository.add(client)

        const clientInDb = await auxRepo.findBy({
            id: client.id
        })

        expect(clientInDb).toBeDefined()
        expect(clientInDb[0].id).toBe(client.id)
        expect(clientInDb[0].name).toBe(client.name)
        expect(clientInDb[0].document).toBe(client.document)
        expect(clientInDb[0].email).toBe(client.email)
        expect(clientInDb[0].password).toBe(client.password)
        expect(clientInDb[0].address.state).toBe(client.address.state)
        expect(clientInDb[0].address.city).toBe(client.address.city)
        expect(clientInDb[0].address.street).toBe(client.address.street)
        expect(clientInDb[0].address.number).toBe(client.address.number)
        expect(clientInDb[0].address.complement).toBe(client.address.complement)
        expect(clientInDb[0].address.zipCode).toBe(client.address.zipCode)
    })
})