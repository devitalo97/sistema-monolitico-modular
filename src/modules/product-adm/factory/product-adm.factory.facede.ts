import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
import DeleteProductUseCase from "../usecase/del-product/del-product.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import GetPriceUseCase from "../usecase/get-price/get-price.usecase";
import UpdateProductUseCase from "../usecase/update-product/update-product.usecase";

export default class ProductAdmFactory {
    static create(): ProductAdmFacade {

        const repository = new ProductRepository()
        
        const addProductUseCase = new AddProductUseCase(repository)
        const checkStockUseCase = new CheckStockUseCase(repository)
        const updateProductUseCase = new UpdateProductUseCase(repository)
        const deleteProductUseCase = new DeleteProductUseCase(repository)
        const findProductUseCase = new FindProductUseCase(repository)
        const getPriceUseCase = new GetPriceUseCase(repository)

        const facade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: checkStockUseCase,
            updateUseCase: updateProductUseCase,
            delProductUseCase: deleteProductUseCase,
            findUseCase: findProductUseCase,
            getPriceUseCase: getPriceUseCase
        })

        return facade
    }
}