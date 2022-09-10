import { assign } from "../../../util/assign";
import { transformEntityData } from "../../../util/transformEntityData";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Price from "./price.entity";
import Promo from "./promo.entity";

type ProductProps = {
    id?: string;
    name: string;
    description: string;
    medias: string[];
    details: {[prop: string]: any};
    price: Price[];
    ableToSell: boolean;
    promo?: Promo[];
}

export default class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _description: string;
    private _medias: string[];
    private _details: {[prop: string]: any};
    private _price: Price[];
    private _ableToSell: boolean;
    private _promo: Promo[];
    
    constructor(props: ProductProps){
       super(props.id)
       assign(this, props)
    }

    get name():string {
        return this._name
    }
    set name(name: string) {
        this._name = name
    }


    get description():string {
        return this._description
    }
    set description(description: string) {
        this._description = description
    }


    get medias(): string[]{
        return this._medias
    }
    set medias(medias: string[]){
        this._medias = medias
    }

    
    get details(): {[prop: string]: any}{
        return this._details
    }
    set details(details: {[prop: string]: any}){
        this._details = details
    }


    get price(): Price[]{
        return this._price
    }
    set price(price: Price[]){
        this._price = price
    }


    get ableToSell(): boolean{
        return this._ableToSell
    }
    set ableToSell(ableToSell: boolean){
        this._ableToSell = ableToSell
    }


    get promo(): Promo[]{
        return this._promo
    }
    set promo(promo: Promo[]){
        this._promo = promo
    }
    
}