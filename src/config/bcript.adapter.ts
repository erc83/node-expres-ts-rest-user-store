import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

// Es la adapctacion de un paquete de tercero
// como objeto otra forma de crear
export const bcryptAdapter = {
    
    hash: ( password: string ) => {
        const salt = genSaltSync();

        return hashSync( password, salt )
    },

    // comparar la contraseña
    compare: (password: string, hashed: string ) => {
        return compareSync( password, hashed);          // true o false
    }
}


