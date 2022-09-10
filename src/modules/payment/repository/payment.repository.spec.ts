import Payment from "../domain/payment.entity"
import { AppDataSource } from "./database/data-source"
import { v4 as uuidv4 } from 'uuid'
import { PaymentModel } from "./payment.model"
import PaymentRepository from "./payment.repository"

describe("payment repository test", () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
    })
    afterAll(async () => {
        await AppDataSource.destroy()
    })

    it("should save a payment in db", async () => {
        const repository = new PaymentRepository()

        const payment = new Payment({
            orderId: uuidv4(),
            amount: 600,
            status: 'approved'
        })

        await repository.save(payment)

        const paymentInDb = await AppDataSource.getRepository(PaymentModel).findBy({
            id: payment.id
        })

        expect(paymentInDb).toBeDefined()
        expect(paymentInDb[0].id).toBe(payment.id)
        expect(paymentInDb[0].status).toBe(payment.status)
        expect(paymentInDb[0].amount).toBe(payment.amount)
        expect(paymentInDb[0].orderId).toBe(payment.orderId)
    })
    
})