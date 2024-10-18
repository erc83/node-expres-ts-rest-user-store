import { Request, Response} from 'express'
import { CustomError } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {

    //DI
    constructor(
        private readonly fileUploadService: FileUploadService,
    ) {}

     // manejo del error
    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode).json({ error: error.message });
        }
        
        console.log(`${ error }`)
        return res.status(500).json({ error: 'Internal server error '})
    }


    uploadFile =  async (req: Request, res: Response) => {
        
        const type = req.params.type // ya viene validado
    
        const file = req.body.files.at(0) as UploadedFile // el nombrearchivo se envia en la respuesta del body
    
        // console.log({ body: req.body }) //logicas para recibir desde el frontend

        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )
            .then( uploaded => res.json( uploaded ) )
            .catch( error => this.handleError( error, res ))
    }
    
    uploadMultipleFiles =  async (req: Request, res: Response) => {
    
        const type = req.params.type
    
        const files = req.body.files as UploadedFile[] //como un arreglo
    
        // console.log({ body: req.body }) //logicas para recibir desde el frontend

        this.fileUploadService.uploadMultiple( files, `uploads/${ type }` )
            .then( uploaded => res.json( uploaded ) )
            .catch( error => this.handleError( error, res ))

    }

}
