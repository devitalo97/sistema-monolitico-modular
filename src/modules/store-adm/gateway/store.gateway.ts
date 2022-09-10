import Item from "../domain/item.entity";
import StoreEntity from "../domain/store.entity";

export default interface StoreGatway {
    create(input: StoreEntity): Promise<void>
    addItem(input: {items: Item[], storeId: string}): Promise<void>
    remItem(input: {items: Item[], storeId: string}): Promise<void>
    find(input: {id: string}): Promise<StoreEntity[]>
    remItemDeleted(input: {productId: string}): Promise<void>
}