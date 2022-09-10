import { assign } from "../../../util/assign";
import { transformEntityData } from "../../../util/transformEntityData";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type PriceProps = {
    id?: string;
    price: number;
    label: string;
    stock: number;
}
export default class Price extends BaseEntity {
    private _price: number
    private _label: string
    private _stock: number

    constructor(props: PriceProps){
        super(props.id)
        assign(this, props)
    }

    get price(): number {
        return this._price
    }
    set price(price: number) {
        this._price = price;
    }


    get stock(): number {
        return this._stock
    }
    set stock(stock: number) {
        this._stock = stock;
    }


    get label(): string {
        return this._label
    }
    set label(label: string) {
        this._label = label;
    }
}