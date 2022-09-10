import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import Product from "../domain/product.entity";
import * as DTO from "./product-adm.facade.dto";
import ProductAdmFacadeInterface from "./product-adm.facede.interface";


type UseCasesProps = {
    addUseCase: UseCaseInterface,
    stockUseCase: UseCaseInterface,
    updateUseCase: UseCaseInterface,
    delProductUseCase: UseCaseInterface
    findUseCase: UseCaseInterface
    getPriceUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUseCase: UseCaseInterface
    private _stockUseCase: UseCaseInterface
    private _updateUseCase: UseCaseInterface
    private _delProductUseCase: UseCaseInterface
    private _findUseCase: UseCaseInterface
    private _getPriceUseCase: UseCaseInterface

    constructor(props: UseCasesProps){
        this._addUseCase = props.addUseCase
        this._stockUseCase = props.stockUseCase
        this._updateUseCase = props.updateUseCase
        this._delProductUseCase = props.delProductUseCase
        this._findUseCase = props.findUseCase
        this._getPriceUseCase = props.getPriceUseCase
    }

    async addProduct(input: DTO.AddProductFacadeInputDto): Promise<DTO.AddProductFacadeOutputDto> {
        return await this._addUseCase.execute(input)
    }

    async checkStock(input: DTO.CheckStockFacadeInputDto): Promise<DTO.CheckStockFacadeOutputDto> {
        return await this._stockUseCase.execute(input)
    }

    async updateProduct(input: DTO.UpdateProductFacadeInputDto): Promise<Product> {
        return await this._updateUseCase.execute(input)
    }

    async deleteProduct(input: DTO.DelelteProductFacadeInputDto): Promise<DTO.DelelteProductFacadeOutputDto> {
        return await this._delProductUseCase.execute(input)
    }

    async findProduct(input: DTO.FindProductFacadeInputDto): Promise<DTO.FindProductFacadeOutputDto> {
        return await this._findUseCase.execute(input)
    }

    async getPrice(input: DTO.GetPriceFacadeInputDto): Promise<DTO.GetPriceFacadeOutputDto> {
        return await this._getPriceUseCase.execute(input)
    }
}