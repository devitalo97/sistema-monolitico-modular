import Address from "../../../@shared/domain/value-object/address.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facede.interface";
import ProductAdmFactory from "../../../product-adm/factory/product-adm.factory.facede";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import * as DTO from './generate-invoice.usecase.dto'

type UseCaseProps = {
    repository: InvoiceGateway,
}
export default class GenerateInvoiceUseCase implements UseCaseInterface {
    private _repository: InvoiceGateway
    
    constructor(props: UseCaseProps){
        this._repository = props.repository
    }

    async execute(input: DTO.GenerateInvoiceUseCaseInputDto): Promise<DTO.GenerateInvoiceUseCaseOutputDto> {
        const address = new Address({
            city: input.city,
            state: input.state,
            street: input.street,
            zipCode: input.zipCode,
            number: input.number,
            complement: input.complement
        })

        
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            items: input.items.map(item => new Product(item)),
            address,
        })
        
        const invoiceItems = invoice?.items?.map(item => ({productId: item.productId, price: item.price}))
        const total = invoiceItems.reduce((total, curr) => total + curr.price, 0)
        invoice.total = total

        await this._repository.save(invoice)

        return {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                productId: item.productId, 
                price: item.price,
                name: item.name
            })),
            total: invoice.total
        }
    }
}