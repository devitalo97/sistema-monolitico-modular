import { assign } from "../../../util/assign"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Client from "./client.entity"
import Product from "./product.entity"

type OrderProps = {
    id?: string,
    client: Client,
    products: Product[],
    status?: string
}

export default class Order extends BaseEntity {
    private _client: Client
    private _products: Product[]
    private _status: string

    constructor(props: OrderProps){
        super(props?.id)
        assign(this, props)
        !props.status && (this._status = 'pending')
    }

    approved(): void{
        this._status = "approved"
    }

    declined(): void{
        this._status = "declined"
    }

    total(): number{
        return this._products.reduce((total, curr) => {
            return total + curr.price
        }, 0)
    }

    get client(): Client{
        return this._client
    }
    set client(client: Client){
        this._client = client
    }

    get products(): Product[]{
        return this._products
    }
    set products(products: Product[]){
        this._products = products
    }

    get status(): string{
        return this._status
    }
    set status(status: string){
        this._status = status
    }
}