import jwt from 'jsonwebtoken';
import { envs } from './envs'

const JWT_SECRET = envs.JWT_SECRET_KEY;


export class JwtGenerator {

    // DI?

    //fn flecha o normal
    static generateToken( payload: any, duration: string = '2h' ) {

        // jwt.sing es un funcion que devuelve un callback 
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SECRET,  { expiresIn: duration }, ( err, token ) => {
                
                if ( err ) return resolve(null);
                
                return resolve ( token );
            });
        })
    }

    static validateToken<T>( token: string ): Promise<T | null> {                 //extrae el payload del jwt

        // verificacion json web token
        return new Promise( (resolve) => {
            jwt.verify( token, JWT_SECRET, ( err, decoded ) => {
                if(err) return resolve(null);

                return resolve( decoded as T)
            });
        })
    }
}

