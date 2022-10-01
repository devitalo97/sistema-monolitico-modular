import AddClientUseCase from "./add-client.usecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("add client usecase unit test", () => {
    it.skip("should add a client", async () => {
        //repositorio
        const repository = MockRepository()
        //usecase
        const usecase = new AddClientUseCase(repository)
        //input
        const input = {
            name: 'Italo',
            email: 'italo@mail.com',
            document: 'document',
            address: {
                state: 'state',
                city: 'city',
                street: 'street',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode'
            }
        }
        //output
        const output = await usecase.execute(input)

        expect(repository.add).toHaveBeenCalled()
        expect(output.ok).toBe(true)
    })
})