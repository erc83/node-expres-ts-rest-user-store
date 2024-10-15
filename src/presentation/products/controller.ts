import { Request, Response} from 'express'
import { CustomError } from '../../domain';
import { CreateCategoryDto, PaginationDto } from '../../domain/dtos';
import { CategoryService } from '../services/category.service';

export class ProductController {

    //DI
    constructor(
        // todo: private readonly productService: ProductService,
    ) {}

     // manejo del error
    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode).json({ error: error.message });
        }
        
        console.log(`${ error }`)
        return res.status(500).json({ error: 'Internal server error '})
    }


    createProduct =  async (req: Request, res: Response) => {

        res.json('create Product')

    }

    getProducts =  async (req: Request, res: Response) => {
        

        const { page = 1, limit = 10} = req.query

        const [error, paginationDto] = PaginationDto.create( +page, +limit )    // +  transforma en numero

        if( error ) return res.status(400).json({ error })

        return res.json('get Products')

    }
}
