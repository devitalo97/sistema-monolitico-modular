import { assign } from "../../../util/assign";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type ProductProps = {
    id?: string,
    name: string,
    description: string,
    price: number,
}

export default class Product extends BaseEntity {
    private _name: string
    private _description: string
    private _price: number

    constructor(props: ProductProps){
        super(props?.id)
        assign(this, props)
    }

    get name():string{
        return this._name
    }
    set name(name:string){
        this._name = name
    }

    get description():string{
        return this._description
    }
    set description(description:string){
        this._description = description
    }

    get price():number{
        return this._price
    }
    set price(price:number){
        this._price = price
    }
}