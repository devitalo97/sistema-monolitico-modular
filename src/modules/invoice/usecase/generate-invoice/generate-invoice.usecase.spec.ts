import { v4 as uuidv4 } from 'uuid'
import { transformEntityData } from '../../../../util/transformEntityData'
import Price from '../../../product-adm/domain/price.entity'
import Product from '../../../product-adm/domain/product.entity'
import { AppDataSource } from '../../../product-adm/repository/database/data-source'
import { ProductModel } from '../../../product-adm/repository/product.model'
import GenerateInvoiceUseCase from './generate-invoice.usecase'

const MockRepository = () => {
    return {
        save: jest.fn(),
        find: jest.fn()
    }
}

describe("generate invoice usecase unit test", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
    })
    
    afterAll(async () => {
        await AppDataSource.destroy()
    })
    
    it("should generate a invoice", async () => {
        const product = new Product({
            name: 'Product #05',
            description: "Product Description #05",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#05'],
            price: [new Price({
                stock: 55,
                label: 'gg',
                price: 88
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })

        const product0 = new Product({
            name: 'Product #0999',
            description: "Product Description #0999",
            ableToSell: false,
            medias: ["media#00", 'media#01', 'media#0999'],
            price: [new Price({
                stock: 55,
                label: 'ss',
                price: 12
            })],
            details: { 
                atributo0: 'valor',
                atributo1: 'valor',
            },
        })
        
        //repository
        const repository = MockRepository()
        
        //usecase
        const usecase = new GenerateInvoiceUseCase({
            repository,
        })

        const input = {
            name: 'Italo',
            document: '559.304.210-13',
            street: 'Av das ubaranas',
            number: '123',
            complement: 'ap',
            city: 'aquiraz',
            state: 'ce',
            zipCode: '29830000',
            items: [
                { 
                    productId: product0.id,
                    name: product0.name,
                    price: product0.price[0].price
                },
                { 
                    productId: product.id,
                    name: product.name,
                    price: product.price[0].price
                }
            ]
        }

        const output = await usecase.execute(input)

        expect(repository.save).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.total).toBeDefined()
        expect(output.total).toBe(100)
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
        expect(output.street).toBe(input.street)
        expect(output.number).toBe(input.number)
        expect(output.complement).toBe(input.complement)
        expect(output.city).toBe(input.city)
        expect(output.state).toBe(input.state)
        expect(output.zipCode).toBe(input.zipCode)
        expect(Array.isArray(output.items)).toBe(true)
        
    })
})