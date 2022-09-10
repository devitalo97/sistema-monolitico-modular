import Address from "../../../@shared/domain/value-object/address.value-object"
import Client from "../../domain/client.entity"
import Order from "../../domain/order.entity"
import Product from "../../domain/product.entity"
import FindOrderUseCase from "./find-order.usecase"

const order = new Order({
    client: new Client({
        name: 'Client name',
        document: 'document',
        email: 'email@mail.com',
        address: new Address({
            state: 'state',
            city: 'city',
            street: 'street',
            number: 'number',
            complement: 'complement',
            zipCode: 'zipCode',
        })
    }),
    products: [
        new Product({
            name: 'Product',
            price: 500,
            description: 'description'
        })
    ],
    status: 'approved'
})

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue([order]),
        add: jest.fn()
    }
}
describe("find order usecase unit test", () => {
    it("should find a order", async () => {
        const repository = MockRepository()

        const usecase = new FindOrderUseCase(repository)
        
        const input = {
            id: order.id
        }
        const output = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.orders[0].id).toBe(order.id)
        expect(output.orders[0].client.name).toBe(order.client.name)
        expect(output.orders[0].client.document).toBe(order.client.document)
        expect(output.orders[0].client.email).toBe(order.client.email)
        expect(output.orders[0].client.address.state).toBe(order.client.address.state)
        expect(output.orders[0].client.address.city).toBe(order.client.address.city)
        expect(output.orders[0].client.address.street).toBe(order.client.address.street)
        expect(output.orders[0].client.address.number).toBe(order.client.address.number)
        expect(output.orders[0].client.address.complement).toBe(order.client.address.complement)
        expect(output.orders[0].client.address.zipCode).toBe(order.client.address.zipCode)
        expect(output.orders[0].products[0].id).toBe(order.products[0].id)
        expect(output.orders[0].products[0].name).toBe(order.products[0].name)
        expect(output.orders[0].products[0].price).toBe(order.products[0].price)
        expect(output.orders[0].products[0].description).toBe(order.products[0].description)
    })
})