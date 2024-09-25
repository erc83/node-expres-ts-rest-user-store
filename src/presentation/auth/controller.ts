import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dtos";
import { AuthService } from "../services/auth.service";


export class AuhtController {
    constructor(
        public readonly authService: AuthService,
    ) {

    }

    // aqui manejamos el metodo de esta manera 
    register = (req: Request, res: Response ) => {

        const [error, registerUserDto] = RegisterUserDto.create( req.body );
        if( error ) return res.status( 400 ).json( { error }  )

        this.authService.registerUser(registerUserDto!)   //signo de exclamacion porque lo tenemos
            .then((user) => res.json(user))


        //res.json(registerUserDto)
    }
    
    login = (req: Request, res: Response ) => {
        res.json('loginUser')
    }

    validateEmail = (req: Request, res: Response ) => {
        res.json('validateEmailUser')
    }
}