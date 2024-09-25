import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain";


export class AuhtController {
    constructor(
        public readonly authService: AuthService,
    ) {

    }

    // manejo del error
    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
            return res.status( error.statusCode).json({ error: error.message });
        }
        
        console.log(`${ error }`)
        return res.status(500).json({ error: 'Internal server error '})
    }



    // aqui manejamos el metodo de esta manera 
    register = (req: Request, res: Response ) => {

        const [error, registerUserDto] = RegisterUserDto.create( req.body );
        if( error ) return res.status( 400 ).json( { error }  )

        this.authService.registerUser(registerUserDto!)   //signo de exclamacion porque lo tenemos
            .then((user) => res.json(user))
            .catch( error => this.handleError(error, res) );

        //res.json(registerUserDto)
    }
    
    login = (req: Request, res: Response ) => {
        res.json('loginUser')
    }

    validateEmail = (req: Request, res: Response ) => {
        res.json('validateEmailUser')
    }
}