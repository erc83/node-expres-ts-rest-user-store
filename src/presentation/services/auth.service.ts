import { UserModel } from "../../data/mongo/model";
import { CustomError } from "../../domain";
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { bcryptAdapter, JwtGenerator } from "../../config";


export class AuthService {
    //DI
    contructor(

    ){}

    // recibimos el register user DTO
    public async registerUser( registerUserDto: RegisterUserDto ) {

        // proceso para registrar el usuario
        const existUser = await UserModel.findOne({ email: registerUserDto.email })
        if( existUser ) throw CustomError.badRequest('Email already exist');

        //idealmente por si una condicion no se cumple capturamos el error si algo es inesperado
        try {
            const user = new UserModel( registerUserDto )           // crea el usuario

            // Encriptar contraseña antes de guardar en la base de datos
            user.password = bcryptAdapter.hash( registerUserDto.password );

            await user.save();
            
            const userEntity = UserEntity.fromObject( user ); 
            const { password, ...userRegister } = userEntity
        
            return { userRegister,                                // tercer return un objeto con dos valores
                token: 'ABC'
            };
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
        return 'todo ok authService temporal'
    }

    public async loginUser( loginUserDto: LoginUserDto ) {

        try {            
            const existUser = await UserModel.findOne({ email: loginUserDto.email }).populate("role")
            if ( !existUser ) throw CustomError.badRequest('Email not exist')
            
            const matchPassword = bcryptAdapter.compare( loginUserDto.password, existUser.password )
            if( !matchPassword ) throw CustomError.badRequest('Invalid Password')   
            
            const userEntity = UserEntity.fromObject( existUser )
            const { password, ...userLogin } = userEntity ;         // desestructuracion del objeto UserLogin

            const token = await JwtGenerator.generateToken({ id: userLogin.id });
            if( !token ) throw CustomError.internalServer('Error while creating JWT')

            return {
                userLogin,
                token: token, 
            };
                
        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }
    }
}
