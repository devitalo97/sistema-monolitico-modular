import { assign } from "../../../util/assign";
import { transformEntityData } from "../../../util/transformEntityData";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type ItemProps = {
    id?: string
    productId: string
}

export default class ItemEntity extends BaseEntity {
    private _productId: string
    
    constructor(props: ItemProps){
        super(props?.id)
        assign(this, props)
    }

    get productId():string {
        return this._productId
    }
    set productId(productId: string) {
        this._productId = productId
    }


}