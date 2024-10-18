import { NextFunction, Request, Response } from 'express'


export class TypeFolderMiddleware {

    // factory function, un methodo que crea un fn
    static validTypesFolder( validTypesFolder: string[] ) {

        return (req: Request, res: Response, next: NextFunction) => {

            //const type = req.params.type   //-> si agregamos directamente el middleware en la route

            //console.log(req.url)                // '/multiple/products'            
            const type = req.url.split('/').at(2) ?? ''     // 'products

            // const validTypes = ['users', 'products', 'categories']
            if (!validTypesFolder.includes( type ) ) {
                return res.status(400).json({ error: `Invalid type: ${ type }, valid one ${ validTypesFolder }`})
            }

            next()
        }
    }
}
