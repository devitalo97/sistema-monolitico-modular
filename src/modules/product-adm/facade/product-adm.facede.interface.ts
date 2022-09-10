import Product from "../domain/product.entity";
import * as DTO from "./product-adm.facade.dto";

export default interface ProductAdmFacadeInterface {
    addProduct(input: DTO.AddProductFacadeInputDto): Promise<DTO.AddProductFacadeInputDto>
    checkStock(input: DTO.CheckStockFacadeInputDto): Promise<DTO.CheckStockFacadeOutputDto>
    updateProduct(input: DTO.UpdateProductFacadeInputDto): Promise<Product>
    deleteProduct(input: DTO.DelelteProductFacadeInputDto): Promise<DTO.DelelteProductFacadeOutputDto>
    findProduct(input: DTO.FindProductFacadeInputDto): Promise<DTO.FindProductFacadeOutputDto>
    getPrice(input: DTO.GetPriceFacadeInputDto): Promise<DTO.GetPriceFacadeOutputDto>
}