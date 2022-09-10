import { v4 as uuidv4 } from 'uuid'

export default class BaseEntity {
    private _id: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id?: string){
        this._id = id || uuidv4();
        this._createdAt = new Date()
        this._updatedAt = new Date()
    }

    get id(): string {
        return this._id
    }
    get createdAt(): Date {
        return this._createdAt
    }

    get updatedAt(): Date {
        return this._updatedAt
    }
    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }

}