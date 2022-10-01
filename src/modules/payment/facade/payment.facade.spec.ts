import PaymentRepository from "../repository/payment.repository"
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase"
import { v4 as uuidv4 } from 'uuid'
import PaymentFacade from "./payment.facade"
import { AppDataSource } from "../repository/database/data-source"
import Payment from "../domain/payment.entity"
import { PaymentModel } from "../repository/payment.model"
import PaymentFactory from "../factory/payment.factory.facade"

describe("payment facade test", () => {
    beforeEach(async () => {
        await AppDataSource.initialize()
    })
    afterEach(async () => {
        await AppDataSource.destroy()
    })
    it.skip("should process a payment", async () => {
    
        // //repository
        // const repository = new PaymentRepository()
        // //usecase
        // const processPaymentUseCase = new ProcessPaymentUseCase(repository)
        // //facade
        // const facade = new PaymentFacade({
        //     processPaymentUseCase
        // })
        
        const facade = PaymentFactory.create()

        //input
        const input = {
            orderId: uuidv4(),
            amount: 650
        }

        //output
        const output = await facade.processPayment(input)

        expect(output).toBeDefined()
        expect(output.id).toBeDefined()
        expect(output.status).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.amount).toBe(input.amount)
        expect(output.status === 'approved' || output.status === 'rejected').toBeDefined()

        const paymentIdDb = await AppDataSource.getRepository(PaymentModel).findBy({
            id: output.id
        })

        expect(paymentIdDb).toBeDefined()
        expect(paymentIdDb[0].amount).toBe(input.amount)
        expect(paymentIdDb[0].orderId).toBe(input.orderId)
        expect(paymentIdDb[0].id).toBe(output.id)
        expect(paymentIdDb[0].status).toBe(output.status)


    })
})