import Invoice from "../domain/invoice.entity"
import Product from "../domain/product.entity"
import { v4 as uuidv4 } from 'uuid'
import Address from "../../@shared/domain/value-object/address.value-object"
import { AppDataSource } from "./database/data-source"
import { InvoiceModel } from "./invoice.model"
import InvoiceRepository from "./invoice.repository"
import { transformEntityData } from "../../../util/transformEntityData"

const auxRepo = AppDataSource.getRepository(InvoiceModel)

const createInvoiceInDb = async (entity: Invoice) => {
    const invoiceCreated = auxRepo.create({
        ...transformEntityData(entity, 'db'),
        items: entity?.items?.map(item => transformEntityData(item, 'db')),
        address: transformEntityData(entity.address, 'db')
    })

    await auxRepo.save(invoiceCreated)
}

describe("invoice repository test", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
    })
    afterAll(async () => {
        await AppDataSource.destroy()
    })
    it("should save a invoice", async () => {
        // repository
        const repository = new InvoiceRepository()

        const input = new Invoice({
            name: 'italo',
            document: '66165279562',
            items: [
                new Product({
                    productId: uuidv4(),
                    price: 500,
                    name: 'product#009'
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
            total: 99999
        })

        await repository.save(input)

        const invoiceInDb = await AppDataSource.getRepository(InvoiceModel).findBy({
            id: input.id
        })

        expect(invoiceInDb).toBeDefined()
        expect(invoiceInDb[0].id).toBe(input.id)
        expect(invoiceInDb[0].name).toBe(input.name)
        expect(invoiceInDb[0].document).toBe(input.document)
        expect(invoiceInDb[0].total).toBe(input.total)
        expect(typeof invoiceInDb[0].address).toBe('object')
        expect(Array.isArray(invoiceInDb[0].items)).toBe(true)
    })

    it("should find a invoice", async () => {
        // repository
        const repository = new InvoiceRepository()

        const input = new Invoice({
            name: 'italo',
            document: '66165279562',
            items: [
                new Product({
                    productId: uuidv4(),
                    price: 496.66,
                    name: 'product#000'
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
            total: 8752.66
        })

        await createInvoiceInDb(input)

        const output = await repository.find({id: input.id})

        expect(output).toBeDefined()
        expect(Array.isArray(output)).toBe(true)
        expect(output[0].id).toBe(input.id)
        expect(output[0].name).toBe(input.name)
        expect(output[0].document).toBe(input.document)
        expect(output[0].address.city).toBe(input.address.city)
        expect(output[0].address.state).toBe(input.address.state)
        expect(output[0].address.street).toBe(input.address.street)
        expect(output[0].address.complement).toBe(input.address.complement)
        expect(output[0].address.number).toBe(input.address.number)
        expect(output[0].address.zipCode).toBe(input.address.zipCode)
        expect(output[0].address).toBeInstanceOf(Address)
        expect(Array.isArray(output[0].items)).toBe(true)
        expect(output[0].items[0]).toBeInstanceOf(Product)
    })
})