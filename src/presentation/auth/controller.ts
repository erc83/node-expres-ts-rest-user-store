import { Request, Response } from "express";


export class AuhtController {

    constructor() {}

    register = (req: Request, res: Response ) => {
        res.json('registerUser')
    }
    
    login = (req: Request, res: Response ) => {
        res.json('loginUser')
    }

    validateEmail = (req: Request, res: Response ) => {
        res.json('validateEmailUser')
    }

}