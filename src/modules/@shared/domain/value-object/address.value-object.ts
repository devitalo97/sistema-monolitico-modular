import { assign } from "../../../../util/assign";
import ValueObject from "./value-object.interface";

type AddressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class Address implements ValueObject {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(props: AddressProps){
        assign(this, props)
    }

    get street(): string{
        return this._street
    }
    set street(street: string){
        this._street = street
    }

    get number(): string{
        return this._number
    }
    set number(number: string){
        this._number = number
    }

    get city(): string{
        return this._city
    }
    set city(city: string){
        this._city = city
    }

    get complement(): string{
        return this._complement
    }
    set complement(complement: string){
        this._complement = complement
    }

    get state(): string{
        return this._state
    }
    set state(state: string){
        this._state = state
    }

    get zipCode(): string{
        return this._zipCode
    }
    set zipCode(zipCode: string){
        this._zipCode = zipCode
    }
}