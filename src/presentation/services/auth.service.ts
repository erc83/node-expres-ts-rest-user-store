import { UserModel } from "../../data/mongo/model";
import { CustomError } from "../../domain";
import { RegisterUserDto } from "../../domain/dtos";


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

            await user.save();

            return user;

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

        return 'todo ok authService temporal'
    }
}
