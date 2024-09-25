import { Router } from 'express';
import { AuhtController } from './controller';
import { AuthService } from '../services/auth.service';

export class AuthRoutes {

static get routes(): Router {

    const router = Router();
    const authService = new AuthService(); //instancia authService que la pide el controller y se agrego al constructor
    
    const controller = new AuhtController( authService ); 

    // Definir las rutas
    router.post('/login', controller.login );
    router.post('/register', controller.register );
    
    router.get('/validate-email/:token', controller.validateEmail );

    return router;
    
    }
}

