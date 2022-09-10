import { assign } from "../../../util/assign";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type PaymentProps = {
    id?: string,
    amount: number,
    orderId: string,
    status?: string,
}

export default class Payment extends BaseEntity implements AggregateRoot {
    private _amount: number
    private _orderId: string
    private _status: string

    constructor(props: PaymentProps){
        super(props?.id)
        assign(this, props)
        !props.status && (this._status = 'pending') 

    }

    get amount(): number{
        return this._amount
    }

    set amount(amount: number){
        this._amount = amount
    }

    get orderId(): string{
        return this._orderId
    }

    set orderId(orderId: string){
        this._orderId = orderId
    }

    get status(): string{
        return this._status
    }

    set status(status: string){
        this._status = status
    }

    public process(): Promise<boolean>{
        const status = Math.random() < 0.5
        this._status = status ? 'approved' : 'rejected'
        return Promise.resolve(status)
    }

}