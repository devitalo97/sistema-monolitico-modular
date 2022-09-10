import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectID } from 'mongodb'
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";

@Entity()
export class CheckoutModel {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    id: string

    @Column()
    client: Client

    @Column()
    products: Product[]

    @Column()
    status: string
}