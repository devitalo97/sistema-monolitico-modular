import { ObjectID } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import Address from "../../@shared/domain/value-object/address.value-object";
import Product from "../domain/product.entity";

@Entity()
export class InvoiceModel {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    id: string

    @Column()
    name: string

    @Column()
    document: string

    @Column()
    items: Product[]

    @Column()
    address: Address

    @Column()
    total: number

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date
}