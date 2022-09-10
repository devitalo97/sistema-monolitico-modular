import * as DTO from './client-adm.facade.dto'

export interface ClientFacadeInterface {
    findClient(input: DTO.FindClientFacadeInputDto): Promise<DTO.FindClientFacadeOutputDto>
    addClient(input: DTO.AddClientFacadeInputDto): Promise<DTO.AddClientFacadeOutputDto>
}