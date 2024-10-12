import { Request, Response} from 'express'
import { CustomError } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos';




export class CategoryController {

    //DI
    constructor() {}

     // manejo del error
    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode).json({ error: error.message });
        }
        
        console.log(`${ error }`)
        return res.status(500).json({ error: 'Internal server error '})
    }


    createCategory =  async (req: Request, res: Response) => {
        //const createCategoryDto = CreateCategoryDto.create( req.body )
        const [error, createCategoryDto] = CreateCategoryDto.create( req.body )
        if ( error ) return res.status(400).json({ error })

        res.json(createCategoryDto)

    }

    getCategory =  async (req: Request, res: Response) => {

        res.json('Get Category')

    }


}
