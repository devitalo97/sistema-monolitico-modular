import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import * as DTO from './find-invoice.usecase.dto'

export default class FindInvoiceUseCase implements UseCaseInterface {
    private _repository: InvoiceGateway
    
    constructor(repository: InvoiceGateway){
        this._repository = repository
    }

    async execute(input: DTO.FindInvoiceUseCaseInputDTO): Promise<DTO.FindInvoiceUseCaseOutputDTO> {
        const invoices = await this._repository.find({id: input.id})
        const invoice = invoices[0]
        return {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice?.items?.map(item => ({
                productId: item.productId, 
                price: item.price, 
                name: item.name
            })),
            total: invoice.total,
            createdAt: invoice.createdAt
        }
    }
} 