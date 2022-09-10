import Address from "../../@shared/domain/value-object/address.value-object"
import Invoice from "../domain/invoice.entity"
import ProductEntity from "../domain/product.entity"
import { AppDataSource } from "../repository/database/data-source"
import InvoiceRepository from "../repository/invoice.repository"
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase"
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase"
import { v4 as uuidv4 } from 'uuid'
import { InvoiceModel } from "../repository/invoice.model"
import { transformEntityData } from "../../../util/transformEntityData"
import InvoiceFacade from "./invoice.facade"
import { ProductModel } from "../../product-adm/repository/product.model"
import Product from "../../product-adm/domain/product.entity"
import Price from "../../product-adm/domain/price.entity"
import InvoiceFactory from "../factory/invoice.factory.facade"

const auxRepo = AppDataSource.getRepository(InvoiceModel)

const createInvoiceInDb = async (entity: Invoice) => {
    const invoiceCreated = auxRepo.create({
        ...transformEntityData(entity, 'db'),
        items: entity?.items?.map(item => transformEntityData(item, 'db')),
        address: transformEntityData(entity.address, 'db')
    })

    await auxRepo.save(invoiceCreated)
}

describe("invoice facade test", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
    })
    afterAll(async () => {
        await AppDataSource.destroy()
    })
    it("shoud find a invoice", async () => {
        const invoice = new Invoice({
            name: 'Italo',
            document: '89699426616',
            address: new Address({
                city: 'city',
                street: 'street',
                state: 'state',
                number: 'number',
                complement: 'complement',
                zipCode: 'zipCode',
            }),
            items: [
                new ProductEntity({
                    price: 500,
                    productId: uuidv4(),
                    name: 'product#988'
                })
            ]
        })
        await createInvoiceInDb(invoice)
       
        // const repository = new InvoiceRepository()
        // const usecase = new FindInvoiceUseCase(repository)
        // const facade = new InvoiceFacade({
        //     findUseCase: usecase,
        //     generateUseCase: undefined
        // })

        const facade = InvoiceFactory.create()
       
        const input = {
            id: invoice.id
        }
        
        const output = await facade.findInvoice(input)
        
        expect(output).toBeDefined()
        expect(output.id).toBe(invoice.id)
        expect(output.name).toBe(invoice.name)
        expect(output.document).toBe(invoice.document)
        expect(output.address.city).toBe(invoice.address.city)
        expect(output.address.state).toBe(invoice.address.state)
        expect(output.address.street).toBe(invoice.address.street)
        expect(output.address.complement).toBe(invoice.address.complement)
        expect(output.address.zipCode).toBe(invoice.address.zipCode)
        expect(output.address.number).toBe(invoice.address.number)
        expect(Array.isArray(output.items)).toBe(true)
    })
    it("shoud generate a invoice", async () => {
        //create product in db for test
        const product = new Product({
            name: 'Product #05',
            description: "Product Description #05",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#05'],
            price: [new Price({
                stock: 67,
                label: 'xx',
                price: 99
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })
        const product0 = new Product({
            name: 'Product #09',
            description: "Product Description #09",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#09'],
            price: [new Price({
                stock: 55,
                label: 'gg',
                price: 99
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })


        // const repository = new InvoiceRepository()
        // const generateUseCase = new GenerateInvoiceUseCase(repository)
        // const facade = new InvoiceFacade({
        //     generateUseCase,
        //     findUseCase: undefined
        // })
        const facade = InvoiceFactory.create()

        const input = {
            name: 'italo',
            document: '47617342217',
            street: 'street',
            number: 'number',
            complement: 'complement',
            city: 'city',
            state: 'state',
            zipCode: 'zipCode',
            items: [
                {
                    productId: product.id,
                    name: product.name,
                    price: product.price[0].price
                },
                {
                    productId: product0.id,
                    name: product.name,
                    price: product0.price[0].price
                }
            ]
        }

        const output = await facade.generateInvoice(input)

        const prices = input.items.map(item => item.price)
        const productsId = input.items.map(item => item.productId)

        expect(output).toBeDefined()
        expect(output.total).toBe(99+99)
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
        expect(output.state).toBe(input.state)
        expect(output.street).toBe(input.street)
        expect(output.complement).toBe(input.complement)
        expect(output.city).toBe(input.city)
        expect(output.zipCode).toBe(input.zipCode)
        expect(output.number).toBe(input.number)
        expect(output.items.filter(el => prices.includes(el.price)).length === 2).toBe(true)
        expect(output.items.filter(el => productsId.includes(el.productId)).length === 2).toBe(true)
    })
})