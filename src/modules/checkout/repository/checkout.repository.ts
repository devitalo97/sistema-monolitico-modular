import { transformEntityData } from "../../../util/transformEntityData";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { CheckoutModel } from "./checkout.model";
import { AppDataSource } from "./database/data-source";

export default class CheckoutRepository implements CheckoutGateway {
    private _repository

    constructor(){
        this._repository = AppDataSource.getMongoRepository(CheckoutModel)
    }

    async add(input: Order): Promise<void>{
        const client = {
            ...input.client,
            address: transformEntityData(input.client.address, 'db')
        }
        const order = this._repository.create({
            ...transformEntityData(input, 'db'),
            client: transformEntityData(client, 'db'),
            products: input?.products?.map(prod => transformEntityData(prod, 'db'))
        })
        await this._repository.save(order)
    }

    async find(input: {id: string}): Promise<Order[]>{
        return (await this._repository.findBy({id: input.id}))
            .map(order => new Order({
                ...order,
                client: new Client({
                    ...order.client
                } as Client), 
                products: order?.products?.map(prod => new Product({...prod } as Product))
            }))
    }
}