import { randomUUID } from "crypto";
import { assign } from "../../../util/assign";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";

type ClientProps = {
    id?: string,
    password?: string,
    name: string,
    email: string,
    document: string,
    address: Address,
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _email: string
    private _name: string
    private _password: string
    private _document: string
    private _address: Address

    constructor(props: ClientProps){
        super(props?.id)
        assign(this, props)
        !props.password && (this._password = randomUUID()) 
    }

    get email():string {
        return this._email
    }

    get name():string {
        return this._name
    }

    get password():string {
        return this._password
    }

    get address(): Address {
        return this._address
    }

    get document(): string {
        return this._document
    }
}