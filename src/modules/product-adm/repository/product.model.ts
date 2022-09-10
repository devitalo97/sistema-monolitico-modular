import { Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";
import Price from "../domain/price.entity";
import Promo from "../domain/promo.entity";

@Entity()
export class ProductModel {
  
    @ObjectIdColumn()
    _id?: string;

    @Column()
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column()
    medias: Array<string>;
    
    @Column()
    price: Array<Price>;
    
    @Column()
    promo: Array<Promo>;
    
    @Column()
    details: IDetails;
    
    @Column()
    ableToSell: boolean;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @CreateDateColumn()
    updatedAt: Date;
}

type IDetails = {
    [prop: string]: any
}