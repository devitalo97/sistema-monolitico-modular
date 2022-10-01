import { transform } from "../../../util/transform";
import Address from "../../@shared/domain/value-object/address.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { AppDataSource } from "./database/data-source";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    private _repository

    constructor (){
        this._repository = AppDataSource.getMongoRepository(InvoiceModel)
    }

    async save(input: Invoice){
        const invoice = this._repository.create({
            ...transform(input, 'db'),
            items: input?.items?.map(prod => transform(prod, 'db')),
            address: transform(input.address, 'db')
        })
        await this._repository.save(invoice)
    }

    async find(input: {id: string}):Promise<Invoice[]>{
        return (await this._repository.findBy({
            id: input.id
        })).map(invoice => new Invoice({
            ...invoice,
            address: new Address({
                city: invoice.address.city,
                state: invoice.address.state,
                street: invoice.address.street,
                complement: invoice.address.complement,
                number: invoice.address.number,
                zipCode: invoice.address.zipCode,
            }),
            items: invoice.items.map(item => new Product(item))
        }))
    }
}