import { regularExps } from "../../../config";

export class LoginUserDto {
    private constructor (
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create( object: {[key: string]: any}): [string?, LoginUserDto?] {
        const { email, password } = object;

        if( !email ) return ['Email property is required', undefined];
        if( !password ) return ['Password property is required', undefined];
        if( !regularExps.email.test( email ) ) return ['Email is not valid', undefined];
        if( password < 6 ) return ['Password too short'];
        
        return [undefined, new LoginUserDto( email, password )]
    }
}

