import * as DTO from './invoice.facade.dto'

export default interface InvoiceFacadeInterface {
    findInvoice(input: DTO.FindInvoiceFacadeInputDto): Promise<DTO.FindInvoiceFacadeOutputDto>
    generateInvoice(input: DTO.GenerateInvoiceFacadeInputDto): Promise<DTO.GenerateInvoiceFacadeOutputDto>
}