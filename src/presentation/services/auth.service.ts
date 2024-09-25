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

        return 'todo ok authService temporal'

    }
}
