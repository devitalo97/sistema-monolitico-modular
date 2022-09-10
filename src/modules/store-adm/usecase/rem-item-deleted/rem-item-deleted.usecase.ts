import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import StoreGatway from '../../gateway/store.gateway'
import * as DTO from './rem-item-deleted.usecase.dto'

export default class RemItemDeletedUseCase implements UseCaseInterface {
    private _repository: StoreGatway

    constructor(repository: StoreGatway){
        this._repository = repository
    }

    async execute(input: DTO.RemItemDeletedUseCaseInputDto): Promise<DTO.RemItemDeletedUseCaseOutuptDto>{
        await this._repository.remItemDeleted(input)
        return {
            ok: true
        }
    }
}