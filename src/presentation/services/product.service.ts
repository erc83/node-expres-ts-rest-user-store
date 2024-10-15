import { ProductModel } from "../../data/mongo/model";
import { CustomError } from "../../domain";
import { CreateProductDto, PaginationDto } from "../../domain/dtos";


export class ProductService {
    //DI
    constructor(){}

    async createProduct ( createProductDto: CreateProductDto ) {
        
        const productExists = await ProductModel.findOne({ name: createProductDto.name })
        if ( productExists ) throw CustomError.badRequest( 'Product already exists' )
        
        try {
            
            const product = new ProductModel( createProductDto )

            await product.save()

            return product

        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }
    
    }

    async getProducts( paginationDto: PaginationDto ) {

        const { page, limit } = paginationDto

        try {
            // ejecucion de manera simultanea llamado total y de categories en una promesa
            const [total, products] = await Promise.all( [
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip( (page - 1) * limit )
                    .limit( limit )
                    // todo: populate
            ] )
            // calculo si hay una siguiente pagina
            const totalPages = Math.ceil(total / limit)
            const nextPage = (page < totalPages) 
                                ? `/api/categories?page=${ (page + 1 ) }&limit=${ limit }`: null
            const prevPage = (page - 1 > 0 ) 
                                ? `/api/categories?page=${ (page - 1 ) }&limit=${ limit }`: null
            return {
                page: page,
                limit: limit,
                total: total,
                next: nextPage,
                prev: prevPage,

                products: products
            }
            
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }

}