import ClientFactory from "../../client-adm/factory/client-adm.factory.facade";
import InvoiceFactory from "../../invoice/factory/invoice.factory.facade";
import PaymentFactory from "../../payment/factory/payment.factory.facade";
import ProductAdmFactory from "../../product-adm/factory/product-adm.factory.facede";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutRepository from "../repository/checkout.repository";
import FindOrderUseCase from "../usecase/find-order/find-order.usecase";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFactory {
    static create(){
        const repository = new CheckoutRepository()
        const findOrderUseCase = new FindOrderUseCase(repository)

        const clientFacade = ClientFactory.create()
        const productFacade = ProductAdmFactory.create()
        const invoiceFacade = InvoiceFactory.create()
        const paymentFacade = PaymentFactory.create()
        const placeOrderUseCase = new PlaceOrderUseCase({
            clientFacade,
            productFacade,
            repository,
            invoiceFacade,
            paymentFacade,
        })

        const facade = new CheckoutFacade({
            findOrderUseCase,
            placeOrderUseCase
        })

        return facade
    }
}