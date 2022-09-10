import { assign } from "../../../util/assign";

type ProductProps = {
    productId: string,
    name: string,
    price: number
}
export default class Product {
    private _price: number
    private _name: string
    private _productId: string

    constructor(props: ProductProps){
        assign(this, props)
    }

    get price(): number{
        return this._price
    }
    set price(price: number){
        this._price = price
    }

    get productId(): string{
        return this._productId
    }
    set productId(productId: string){
        this._productId = productId
    }

    get name(): string{
        return this._name
    }
    set name(name: string){
        this._name = name
    }



}