import { NextFunction, Request, Response } from 'express'
import { JwtGenerator } from '../../config'
import { UserModel } from '../../data/mongo/model'
import { UserEntity } from '../../domain/entities'


export class AuthMiddleware {

    // DI   si se neceista inyecciones de dependencia 
    // se puede realizar mediante un metodo estatico

    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        //const authorization = req.header('x-token') //personalizado
        const authorization = req.header('Authorization')
        if( !authorization ) return res.status(401).json({ error: 'No token provided' })
        
        if( !authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer Token'})
        
        //const token = authorization.split(' ')[1]
        const token = authorization.split(' ').at(1) || ''     // nueva sintaxis de los arreglos

        try {
            // payload pueden ser dos objetos
            const payload = await JwtGenerator.validateToken<{ id: string }>( token )                           
            if( !payload ) return res.status(401).json({ error: 'Invalid token '})
            
            const user = await UserModel.findById( payload.id )
            if( !user ) return res.status(401).json({ error: 'Invalid token - user'})
            
            //req.body.user = user
            req.body.user = UserEntity.fromObject( user ) 
            
            next()

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error '})
        }
    }
}