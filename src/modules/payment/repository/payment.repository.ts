import { transform } from "../../../util/transform";
import Payment from "../domain/payment.entity";
import { PaymentGateway } from "../gateway/payment.gateway";
import { AppDataSource } from "./database/data-source";
import { PaymentModel } from "./payment.model";

export default class PaymentRepository implements PaymentGateway {
    private _db
    
    constructor(){
        this._db = AppDataSource.getMongoRepository(PaymentModel)
    }

    async save(input: Payment): Promise<void>{
        const payment = await this._db.create({
            id: input.id,
            amount: input.amount,
            orderId: input.orderId,
            status: input.status,
            updatedAt: input.updatedAt,
            createdAt: input.createdAt
        })
        await this._db.save(payment)
    }
}