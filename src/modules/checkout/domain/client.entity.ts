import { assign } from "../../../util/assign"
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Address from "../../@shared/domain/value-object/address.value-object"

type ClientProps = {
    id?: string,
    name: string,
    email: string,
    document: string,
    address: Address
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string
    private _email: string
    private _document: string
    private _address: Address

    constructor(props: ClientProps){
        super(props?.id)
        assign(this, props)
    }

    get name(): string{
        return this._name
    }
    set name(name :string){
        this._name = name
    }

    get email(): string{
        return this._email
    }
    set email(email: string){
        this._email = email
    }

    get document(): string{
        return this._document
    }
    set document(document: string){
        this._document = document
    }

    get address(): Address{
        return this._address
    }
    set address(address :Address){
        this._address = address
    }
}