import Order from "../domain/order.entity";

export default interface CheckoutGateway {
    add(input: Order): Promise<void>
    find(input: {id: string}): Promise<Order[]>
}