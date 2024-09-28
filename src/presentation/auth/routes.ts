import { Router } from 'express';
import { AuhtController } from './controller';
import { AuthService, EmailService } from '../services';
import { envs } from '../../config';

export class AuthRoutes {

static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
        envs.MAILER_SERVICE,
        envs.MAILER_EMAIL,
        envs.MAILER_SECRET_KEY,
    );
    
    const authService = new AuthService( emailService ); //instancia authService que la pide el controller y se agrego al constructor
    
    const controller = new AuhtController( authService ); 

    // Definir las rutas
    router.post('/login', controller.login );
    router.post('/register', controller.register );
    
    router.get('/validate-email/:token', controller.validateEmail );

    return router;
    
    }
}

