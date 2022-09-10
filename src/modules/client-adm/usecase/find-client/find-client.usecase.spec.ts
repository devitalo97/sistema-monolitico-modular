import Address from "../../../@shared/domain/value-object/address.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const client = new Client({
    name: 'Roberta',
    email: 'roberta@mail.com',
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


const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve([client]))
    }
}
describe("find client usecase unit test", () => {
    it("should find a client", async () => {
        //repository
        const repository = MockRepository()
        //usecase
        const usecase = new FindClientUseCase(repository)
        //input
        const input = {
            id: client.id
        }
        //output
        const output = await usecase.execute(input)

        expect(output).toBeDefined()
        expect(output.clients.length >= 0).toBe(true)
        expect(output.clients[0].id).toBe(input.id)
        expect(output.clients[0].name).toBeDefined()
        expect(output.clients[0].email).toBeDefined()
        expect(output.clients[0].password).toBeDefined()
        expect(output.clients[0].address).toBeDefined()
        expect(output.clients[0].document).toBeDefined()
    })
})