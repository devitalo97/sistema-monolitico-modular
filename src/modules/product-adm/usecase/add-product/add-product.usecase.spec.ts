import Price from "../../domain/price.entity"
import Promo from "../../domain/promo.entity"
import AddProductUseCase from "./add-product.usecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findByIds: jest.fn()
    }
}

describe('Add Product UseCase Unit Test', () => {
    it('should add a product', async () => {
        //repository
        const repository = MockRepository()
        //usecase
        const usecase = new AddProductUseCase(repository)

        const input = {
            name: 'Product #00',
            description: 'Product Description #00',
            medias: ['Media#00', 'Media#01', 'Media#03'],
            details: {
                atributo0: 'valor',
                atributo1: 'valor',
                atributo2: 'valor',
            },
            price: [
                {
                    price: 57.98, 
                    stock: 167, 
                    label: 'x'
                },
                {
                    price: 106.68, 
                    stock: 374, 
                    label: 'u'
                }
            ],
            ableToSell: false,
            promo: [
                {
                    method: 'method',
                    type: 'type',
                },
            ]
        }

        const product = await usecase.execute(input)

        expect(repository.add).toHaveBeenCalled()
        expect(product.id).toBeDefined()
        expect(product.name).toBe(input.name)
        expect(product.description).toBe(input.description)
        expect(product.ableToSell).toBe(input.ableToSell)
        expect(Array.isArray(product.medias)).toBe(true);
        expect(typeof product.details).toBe('object')
        expect(Array.isArray(product.price)).toBe(true);
        expect(Array.isArray(product.promo)).toBe(true);
        expect(product.price[0]).toBeInstanceOf(Price)
        expect(product.promo[0]).toBeInstanceOf(Promo)
    })
})
