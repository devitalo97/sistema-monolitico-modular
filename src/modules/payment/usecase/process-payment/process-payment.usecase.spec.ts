import { v4 as uuidv4 } from 'uuid'
import ProcessPaymentUseCase from './process-payment.usecase'

const MockRepository = () => {
    return {
        save: jest.fn()
    }
}
describe("process payment usecase unit test", () => {
    it("should process a payment", async () => {
        //repository
        const repository = MockRepository()
        //usecase
        const usecase = new ProcessPaymentUseCase(repository)
        //input
        const input = {
            orderId: uuidv4(),
            amount: 500
        }
        //output
        const output = await usecase.execute(input)

        expect(repository.save).toHaveBeenCalled()
        expect(output).toBeDefined()
        expect(output.id).toBeDefined()
        expect(output.status).toBeDefined()
        expect(output.status === 'approved' || output.status === 'rejected').toBe(true)
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.amount).toBe(input.amount)
    })
})