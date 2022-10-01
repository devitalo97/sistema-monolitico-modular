import { assign } from "../../../util/assign";
import { transform } from "../../../util/transform";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type PromoProps = {
    id?: string;
    method: string;
    type: string;
}
export default class Promo extends BaseEntity {
    private _method: string
    private _type: string

    constructor(props: PromoProps){
        super(props.id)
        assign(this, props)
    }

    set method(method: string){
        this._method = method
    }
    get method(): string{
        return this._method
    }

    set type(type: string){
        this._type = type
    }
    get type(): string{
        return this._type
    }

}