import { Router } from 'express'
import { FileUploadController } from './controller'
import { FileUploadService } from '../services/file-upload.service'
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware'
import { TypeFolderMiddleware } from '../middlewares/type-folder.middleware'


export class FileUploadRoutes {
    
    static get routes(): Router {
        
        const router = Router()
    
        const controller = new FileUploadController(
            new FileUploadService()
        )

        router.use( FileUploadMiddleware.containFiles ) // se aplica a las dos rutas simultaneamente
        router.use( TypeFolderMiddleware.validTypesFolder(['users', 'products', 'categories']) )

        // Definir las rutas
        // api/upload/single/<user|category|product>/
        // api/upload/multiple/<user|category|product>/
        router.post('/single/:type', controller.uploadFile)
        
        router.post('/multiple/:type', controller.uploadMultipleFiles )    // segundo argumento el middleware o arreglo
        
        // pequeño detalle en express
        //router.post('/multiple/:type', [TypeFolderMiddleware.validTypesFolder(['users', 'products', 'categories'])] , controller.uploadMultipleFiles )    // segundo argumento el middleware o arreglo
        
        return router
    }
}