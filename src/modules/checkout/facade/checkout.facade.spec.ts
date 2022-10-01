import ClientFactory from "../../client-adm/factory/client-adm.factory.facade"
import InvoiceFactory from "../../invoice/factory/invoice.factory.facade"
import PaymentFactory from "../../payment/factory/payment.factory.facade"
import ProductEntityDomain from "../../product-adm/domain/product.entity"
import ProductAdmFactory from "../../product-adm/factory/product-adm.factory.facede"
import CheckoutRepository from "../repository/checkout.repository"
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase"
import { v4 as uuidv4 } from 'uuid'
import { ClientModel } from "../../client-adm/repository/client.model"
import { AppDataSource as AppDataSourceClient } from '../../client-adm/repository/database/data-source'
import { AppDataSource as AppDataSourceProduct } from '../../product-adm/repository/database/data-source'
import { AppDataSource as AppDataSourceCheckout } from "../repository/database/data-source"
import { AppDataSource as AppDataSourcePayment } from "../../payment/repository/database/data-source"
import { AppDataSource as AppDataSourceInvoice } from "../../invoice/repository/database/data-source"
import { transform } from "../../../util/transform"
import { ProductModel } from "../../product-adm/repository/product.model"
import ClientAdm from "../../client-adm/domain/client.entity"
import Address from "../../@shared/domain/value-object/address.value-object"
import Price from "../../product-adm/domain/price.entity"
import CheckoutFacade from "./checkout.facade"
import FindOrderUseCase from "../usecase/find-order/find-order.usecase"
import Order from "../domain/order.entity"
import Product from "../domain/product.entity"
import Client from "../domain/client.entity"
import { CheckoutModel } from "../repository/checkout.model"
import CheckoutFactory from "../factory/checkout.factory.facade"

const auxClientAdmRepo = AppDataSourceClient.getMongoRepository(ClientModel)

const createClientInDb = async (entity: ClientAdm) => {
    const clientCreated = auxClientAdmRepo.create({
        ...transform(entity, 'db'),
        address: transform(entity.address, 'db')
    })
    await auxClientAdmRepo.save(clientCreated)
}

const auxProductAdmRepo = AppDataSourceProduct.getMongoRepository(ProductModel)

const createProductInDb = async (entities: ProductEntityDomain[]) => {
    const products = entities.map(entity => auxProductAdmRepo.create({
        ...transform(entity, 'db'),
        price: entity.price.map(price => transform(price, 'db')),
    }))

    await auxProductAdmRepo.save(products)
}

const auxClientRepo = AppDataSourceCheckout.getMongoRepository(CheckoutModel)

const createOrderInDb = async (entity: Order) => {
    const client = {
        ...entity.client,
        address: transform(entity.client.address, 'db')
    }
    const orderCreated = auxClientRepo.create({
        ...transform(entity, 'db'),
        client: transform(client, 'db'),
        products: entity?.products?.map(prod => transform(prod, 'db'))
    })
    await auxClientRepo.save(orderCreated)
}

describe("checkout facade test", () => {
    beforeEach(async () => {
        await AppDataSourceClient.initialize()
        await AppDataSourceProduct.initialize()
        await AppDataSourceCheckout.initialize()
        await AppDataSourcePayment.initialize()        
        await AppDataSourceInvoice.initialize()
    })

    afterEach(async () => {
        await AppDataSourceClient.destroy()
        await AppDataSourceProduct.destroy()
        await AppDataSourceCheckout.destroy()
        await AppDataSourcePayment.destroy()        
        await AppDataSourceInvoice.destroy()
    })

    it.skip("should place an order", async () => {
        const products = [
            new ProductEntityDomain({
                name: 'product name #00',
                description: 'product description #00',
                ableToSell: true,
                medias: ['media #00'],
                details: {
                    detail_one: 'detail_one'
                },
                price: [
                    new Price({
                        label: 'label',
                        price: 415.88,
                        stock: 77
                    })
                ]
            }),
            new ProductEntityDomain({
                name: 'product name #01',
                description: 'product description #01',
                ableToSell: true,
                medias: ['media #00'],
                details: {
                    detail_one: 'detail_one'
                },
                price: [
                    new Price({
                        label: 'label',
                        price:  965.74,
                        stock: 168
                    })
                ]
            })
        ]
        
        const client = new ClientAdm({
            id: uuidv4(),
            name: 'Italo',
            document: 'docuemnt',
            password: 'password',
            email: 'email@mail.com',
            address: new Address({
                street: 'street',
                number: 'number',
                complement: 'complement',
                city: 'city',
                state: 'state',
                zipCode: 'zipCode',
            })
        })
        
        //criar client no banco
        await createClientInDb(client)
        await createProductInDb(products)
        //criar produtcs no banco

        // const repository = new CheckoutRepository()
        // const clientFacade = ClientFactory.create()
        // const productAdmFacade = ProductAdmFactory.create()
        // const invoiceFacade = InvoiceFactory.create()
        // const paymentFacade = PaymentFactory.create()
        
        // const placeOrderUseCase = new PlaceOrderUseCase({
        //     clientFacade: clientFacade,
        //     productFacade: productAdmFacade,
        //     repository,
        //     invoiceFacade: invoiceFacade,
        //     paymentFacade: paymentFacade
        // })

        // const facade = new CheckoutFacade({
        //     placeOrderUseCase: placeOrderUseCase,
        //     findOrderUseCase: undefined
        // })

        const facade = CheckoutFactory.create()

        const input = {
            clientId: client.id,
            products: [
                {
                    productId: products[0].id,
                    priceId: products[0].price[0].id
                },
                {
                    productId: products[1].id,
                    priceId: products[1].price[0].id
                }
            ]
        }

        const output = await facade.placeOrder(input)
        
        expect(output).toBeDefined()
        expect(output.id).toBeDefined()
        expect(output.invoiceId).toBeDefined()
        expect(output.total).toBe(965.74+415.88)
        expect(output.status).toBeDefined()
        expect(output.clientId).toBe(client.id)
        expect(Array.isArray(output.products)).toBe(true)

        // id: string,
        // invoiceId: string,
        // clientId: string
        // status: string,
        // total: number,
        // products: {
        //     productId: string,
        //     price: number,
        // }[],

    })

    it.skip("should find an order", async () => {
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

        await createOrderInDb(order)

        // const repository = new CheckoutRepository()
        // const findOrderUseCase = new FindOrderUseCase(repository)

        // const facade = new CheckoutFacade({
        //     findOrderUseCase,
        //     placeOrderUseCase: undefined
        // })

        const facade = CheckoutFactory.create()
    
        const input = {
            id: order.id
        }

        const output = await facade.findOrder(input)

        expect(output).toBeDefined()
        expect(output.orders[0].id).toBe(order.id)
        expect(output.orders[0].status).toBe(order.status)
        expect(output.orders[0].client.name).toBe(order.client.name)
        expect(output.orders[0].client.email).toBe(order.client.email)
        expect(output.orders[0].client.document).toBe(order.client.document)
        expect(output.orders[0].products[0].id).toBe(order.products[0].id)
    })
})