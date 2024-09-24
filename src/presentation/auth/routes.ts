import { Router } from 'express';
import { AuhtController } from './controller';

export class AuthRoutes {

static get routes(): Router {

    const router = Router();

    const controller = new AuhtController();

    // Definir las rutas
    router.post('/login', controller.login );
    router.post('/register', controller.register );
    
    router.get('/validate-email/:token', controller.validateEmail );


    return router;
    
    }
}

