import Product from "../domain/product.entity";

export default interface ProductGateway{
    add(input: Product): Promise<void>
    delete(input: {productId: string}): Promise<void>
    find(query: {id?: string, name?: string}): Promise<Product[]>
    update(query: Product): Promise<Product>
    findByIds(query: {ids: string[]}): Promise<Product[]>
}