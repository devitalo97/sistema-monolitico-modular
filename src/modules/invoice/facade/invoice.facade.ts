import UseCaseInterface from '../../@shared/usecase/usecase.interface';
import * as DTO from './invoice.facade.dto'
import InvoiceFacadeInterface from "./invoice.facade.interface";

type UseCasesProps = {
    findUseCase: UseCaseInterface,
    generateUseCase: UseCaseInterface,
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUseCase: UseCaseInterface
    private _generateUseCase: UseCaseInterface

    constructor(props: UseCasesProps){
        this._findUseCase = props.findUseCase
        this._generateUseCase = props.generateUseCase
    }
    async findInvoice(input: DTO.FindInvoiceFacadeInputDto): Promise<DTO.FindInvoiceFacadeOutputDto> {
        return await this._findUseCase.execute(input)
    }
    async generateInvoice(input: DTO.GenerateInvoiceFacadeInputDto): Promise<DTO.GenerateInvoiceFacadeOutputDto> {
        return await this._generateUseCase.execute(input)
    }
}