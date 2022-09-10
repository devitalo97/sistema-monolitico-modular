import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";
import Item from "../domain/item.entity";

@Entity()
export class StoreModel {
    @ObjectIdColumn()
    _id?: string;

    @Column()
    id: string

    @Column()
    items: Array<Item>

    @CreateDateColumn()
    createdAt: Date;
    
    @CreateDateColumn()
    updatedAt: Date;
}
