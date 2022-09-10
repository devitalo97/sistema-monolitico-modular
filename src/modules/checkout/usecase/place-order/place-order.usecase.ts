import Address from "../../../@shared/domain/value-object/address.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { ClientFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import { PaymentFacadeInterface } from "../../../payment/facade/payment.facade.interface";
import Price from "../../../product-adm/domain/price.entity";
import Promo from "../../../product-adm/domain/promo.entity";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facede.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import * as DTO from './place-order.usecase.dto'


type PlaceOrderUseCaseProps = {
    clientFacade: ClientFacadeInterface
    productFacade: ProductAdmFacadeInterface
    repository: CheckoutGateway
    invoiceFacade: InvoiceFacadeInterface
    paymentFacade: PaymentFacadeInterface
}

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientFacadeInterface
    private _productFacade: ProductAdmFacadeInterface
    private _repository: CheckoutGateway
    private _invoiceFacade: InvoiceFacadeInterface
    private _paymentFacade: PaymentFacadeInterface
    private _products: Product[]

    constructor(props: PlaceOrderUseCaseProps){
        this._clientFacade = props?.clientFacade
        this._productFacade = props?.productFacade
        this._repository = props?.repository
        this._invoiceFacade = props?.invoiceFacade
        this._paymentFacade = props?.paymentFacade
    }

    async execute(input: DTO.PlaceOrderUseCaseInputDto): Promise<DTO.PlaceOrderUseCaseOutputDto> {
        //buscar cliente --> checar se cliente existe
        const { clients } = await this._clientFacade.findClient({id: input.clientId})
        if(!clients.length){
            throw new Error("Client not found")
        }
        
        //validar produtos
        await this.validateProducts(input)

        //recuperar produtos e consultar precos dos produtos
        const products = await this.getProducts(input)

        //criar o objeto client
        const client = new Client({
            id: clients[0].id,
            name: clients[0].name,
            email: clients[0].email,
            document: clients[0].document,
            address: new Address({
                ...clients[0].address
            })
        })
        //criar o objeto da ordem de servico

        const order = new Order({
            client,
            products: products
        })

        //processar o pagamento

        const payment = await this._paymentFacade.processPayment({
            orderId: order.id,
            amount: order.total()
        })

        //caso aprovado -> gerar uma invoice -> mudar status da ordem
        const invoice = 
            payment.status === 'approved' ?
                await this._invoiceFacade.generateInvoice({
                    name: client.name,
                    document: client.document,
                    street: client.address.street,
                    number: client.address.number,
                    complement: client.address.complement,
                    city: client.address.city,
                    state: client.address.state,
                    zipCode: client.address.zipCode,
                    items: products.map(item => ({
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                    }))
                }) : null
        
        payment.status === 'approved' && order.approved()
        payment.status === 'rejected' && order.declined()
        
        //adicionar a ordem no repositorio
        this._repository.add(order)

        //retornar dto

        return {
            id: order.id,
            invoiceId: invoice ? invoice.id : null,
            clientId: client.id,
            status: order.status,
            total: order.total(),
            products: order.products.map(item => ({
                price: item.price,
                productId: item.id,
            }))
        }
        
    }

    private async validateProducts(input: DTO.PlaceOrderUseCaseInputDto): Promise<void>{
        if(!input.products || input.products.length === 0){
            throw new Error("Products array is empty")
        }
        const stocks = (await this._productFacade.checkStock({
            products: input.products
        })).products.map(prod => ({id: prod.productId, inStock: prod.stock > 0}))

        if(!stocks.every(prod => prod.inStock === true)){
            const ids = stocks.filter(prod => prod.inStock === false).map(item => item.id)
            throw new Error(`Some product is out of stock: ${JSON.stringify(ids)}`)
        }

    }

    private async getProducts(input: DTO.PlaceOrderUseCaseInputDto): Promise<Product[]>{
        const ids = input.products.map(prod => ({id: prod.productId}))
        const { products } = (await this._productFacade.findProduct({products: ids}))

        if(!products.length || products.length < input.products.length){
            const productReveidIds = products?.map(prod => prod.id)
            let idsNotFound = ids?.filter(el => !productReveidIds.includes(el.id))?.map(item => item.id)
            throw new Error(`Some product not found: ${JSON.stringify(idsNotFound)}`)
        }

        
        const result = products?.map(prod => {
            const { priceId } = input.products.filter(el => el.productId === prod.id)[0]
            const { price } = prod?.price?.filter(price => price.id === priceId)[0]
            return new Product({
                id: prod.id,
                name: prod.name,
                description: prod.description,
                price: price
            })
        })
        
        this._products = result
        return result

    }
}