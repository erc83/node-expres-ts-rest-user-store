import { regularExps } from "../../../config";


export class RegisterUserDto {
    //
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ){}

    static create( object: {[key: string]: any }): [string?, RegisterUserDto?] {
        const {name, email, password } = object;
    
        if( !name ) return ['Name property is required', undefined];
        if( !email ) return ['Email property is required', undefined];
        if( !regularExps.email.test( email ) ) return ['Email is not valid', undefined];
        if( !password ) return ['Password property is required', undefined];
        if( password.length < 6 ) return ['Password too short'];

        // si pasan todas las validaciones, creamos la nueva instancia
        return [ undefined, new RegisterUserDto(name, email, password)];
    
    }
}