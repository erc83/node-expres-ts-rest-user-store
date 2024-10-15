import { CategoryModel } from "../../data/mongo/model";
import { CustomError } from "../../domain";
import { CreateCategoryDto, PaginationDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";


export class CategoryService {
    //DI
    constructor(){}

    async createCategory ( createCategoryDto: CreateCategoryDto,  user: UserEntity ) {
        
        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name })
        if ( categoryExists ) throw CustomError.badRequest( 'Category already exists' )
        
        try {
            
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            })

            await category.save()

            return {
                id: category.id,
                name: category.name,
                available: category.available
            }

        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }
    
    }

    async getCategories( paginationDto: PaginationDto ) {

        const { page, limit } = paginationDto

        try {
            //const total = await CategoryModel.countDocuments()
            //const categories = await CategoryModel.find()
            //    .skip( (page - 1) * limit )
            //    .limit( limit )

            // ejecucion de manera simultanea llamado total y de categories en una promesa
            const [total, categories] = await Promise.all( [
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip( (page - 1) * limit )
                    .limit( limit )
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

                categories: categories.map(category => {
                    return {
                        id: category.id,
                        name: category.name,
                        available: category.available,
                    }
                })
            }
            
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }

}