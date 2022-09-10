import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class ClientModel {
    @ObjectIdColumn()
    _id?: string;

    @Column()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    document: string

    @Column()
    address: {
        state: string,
        city: string,
        street: string,
        number: string,
        complement: string,
        zipCode: string,
    }

    @CreateDateColumn()
    createdAt: Date;
    
    @CreateDateColumn()
    updatedAt: Date;
}
