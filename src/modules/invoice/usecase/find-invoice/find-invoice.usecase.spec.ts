import Invoice from "../../domain/invoice.entity"
import Product from "../../domain/product.entity"
import { v4 as uuidv4 } from 'uuid'
import Address from "../../../@shared/domain/value-object/address.value-object"
import FindInvoiceUseCase from "./find-invoice.usecase"

const invoice = new Invoice({
    name: 'Italo',
    document: '54855127558',
    items: [
        new Product({
            productId: uuidv4(),
            price: 450,
            name: 'product name #00'
        }),
        new Product({
            productId: uuidv4(),
            price: 785,
            name: 'product name #01'
        })
    ],
    address: new Address({
        city: 'city',
        number: 'number',
        state: 'state',
        street: 'street',
        complement: 'complement',
        zipCode: 'zipCode',
    }),
    total: (450 + 785)
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve([invoice])),
        save: jest.fn()
    }
}

describe("find invoice usecase unit test", () => {
    it.skip("should find a invoice", async () => {
        // repository
        const repository = MockRepository()

        const usecase = new FindInvoiceUseCase(repository)

        const input = {
            id: invoice.id
        }

        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.id).toBe(input.id)
        expect(output.name).toBe(invoice.name)
        expect(Array.isArray(output.items)).toBe(true)
        expect(typeof output.address).toBe('object')
        expect(output.total).toBe(invoice.total)
    })
})