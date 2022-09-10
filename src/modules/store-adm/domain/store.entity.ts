import { assign } from "../../../util/assign";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Item from "./item.entity";

type StoreProps = {
    id?: string
    items: Item[]
}

export default class StoreEntity extends BaseEntity implements AggregateRoot {
    private _items: Item[]

    constructor(props: StoreProps){
        super(props?.id)
        assign(this, props)
    }

    get items():Item[] {
        return this._items
    }

    set items(items: Item[]) {
        this._items = [...items]
    }

}