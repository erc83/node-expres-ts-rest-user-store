import { Router } from 'express'
import { CategoryController } from './controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { CategoryService } from '../services/category.service'


export class CategoryRoutes {
    
    static get routes(): Router {
        
        const router = Router()
        const categoryService = new CategoryService()
        const controller = new CategoryController(categoryService)

        // definir las rutas
        router.get('/', controller.getCategory)
        // valida que esta ruta contenga el JWT
        router.post('/', [ AuthMiddleware.validateJWT ], controller.createCategory )    // segundo argumento el middleware o arreglo
        
        return router
    }
}