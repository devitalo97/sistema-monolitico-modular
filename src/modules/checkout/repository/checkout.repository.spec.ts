import { transform } from "../../../util/transform"
import Address from "../../@shared/domain/value-object/address.value-object"
import Client from "../domain/client.entity"
import Order from "../domain/order.entity"
import Product from "../domain/product.entity"
import { CheckoutModel } from "./checkout.model"
import CheckoutRepository from "./checkout.repository"
import { AppDataSource } from "./database/data-source"

const auxRepo = AppDataSource.getRepository(CheckoutModel)

const createOrderInDb = async (entity: Order) => {
    const client = {
        ...entity.client,
        address: transform(entity.client.address, 'db')
    }
    const orderCreated = auxRepo.create({
        ...transform(entity, 'db'),
        client: transform(client, 'db'),
        products: entity?.products?.map(prod => transform(prod, 'db'))
    })

    await auxRepo.save(orderCreated)
}


describe("checkout repository test", () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })
    afterEach(async () => {
        await AppDataSource.destroy()
    })
    it.skip("should add a order in db", async () => {
        const order = new Order({
            status: 'approved',
            products: [
                new Product({
                    name: 'Product#00',
                    description: 'Description Product#00',
                    price: 658.99,
                })
            ],
            client: new Client({
                name: 'Italo',
                email: 'italo@mail.com',
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
        })

        const repository = new CheckoutRepository()

        await repository.add(order)

        const orderIdDb = await auxRepo.findBy(
            {id: order.id}
        )

        expect(orderIdDb).toBeDefined()
        expect(orderIdDb[0].id).toBe(order.id)
        expect(orderIdDb[0].status).toBe(order.status)
        expect(orderIdDb[0].client.name).toBe(order.client.name)
        expect(orderIdDb[0].client.email).toBe(order.client.email)
        expect(orderIdDb[0].client.document).toBe(order.client.document)
        expect(orderIdDb[0].products[0].id).toBe(order.products[0].id)
    })

    it.skip("should be find a order", async () => {
        const order = new Order({
            status: 'approved',
            products: [
                new Product({
                    name: 'Product#00',
                    description: 'Description Product#00',
                    price: 658.99,
                })
            ],
            client: new Client({
                name: 'Italo',
                email: 'italo@mail.com',
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
        })

        await createOrderInDb(order)

        const repository = new CheckoutRepository()

        const input = {
            id: order.id
        }
        const output = await repository.find(input)

        expect(output).toBeDefined()
        expect(output[0].id).toBe(order.id)
        expect(output[0].status).toBe(order.status)
        expect(output[0].client.name).toBe(order.client.name)
        expect(output[0].client.email).toBe(order.client.email)
        expect(output[0].client.document).toBe(order.client.document)
        expect(output[0].products[0].id).toBe(order.products[0].id)
    })
})