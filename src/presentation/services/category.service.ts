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
            const categories = await CategoryModel.find()
                .skip( (page - 1) * limit )
                .limit( limit )

            return {
                page: page,
                limit: limit,

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