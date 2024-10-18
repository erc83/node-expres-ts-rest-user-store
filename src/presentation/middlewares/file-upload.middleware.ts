import { NextFunction, Request, Response } from 'express'


export class FileUploadMiddleware {

    static containFiles(req: Request, res: Response, next: NextFunction) {

        if( !req.files || Object.keys( req.files ).length === 0 ) {
            return res.status(400).json({ error: 'No files were selected' })
        }

        if( !Array.isArray ( req.files.file ) ) {   // si es el objeto
            req.body.files = [ req.files.file]      // aqui lo coloco como un arreglo
        } else {
            req.body.files = req.files.file         // file es el nombre del archivo que estoy esperando
        }

        next()
    }

}