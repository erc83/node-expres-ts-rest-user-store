import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { ProductController } from './controller'



export class ProductRoutes {
    
    static get routes(): Router {
        
        const router = Router()

        const controller = new ProductController()

        // definir las rutas
        router.get( '/', controller.getProducts )
        router.post('/', [ AuthMiddleware.validateJWT ], controller.createProduct )    // segundo argumento el middleware o arreglo
        
        return router
    }
}