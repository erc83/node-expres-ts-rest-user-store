import { UserModel } from "../../data/mongo/model";
import { CustomError } from "../../domain";
import { RegisterUserDto, LoginUserDto } from "../../domain/dtos";
import { UserEntity } from "../../domain/entities";
import { bcryptAdapter, envs, JwtGenerator } from "../../config";
import { EmailService } from "./email.service";


export class AuthService {
    //DI
    constructor(
        // DI - Email Service                           podemos recibir una fn para recibir el correo electronico
        private readonly emailService: EmailService,            // o inyectar el servicio del correo
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

            //Email de confirmacion
            // this.emailService.sendEmail();            lo llmamos desde aqui
            this.sendEmailValidationLink( user.email ); // ya tiene las validaciones
            
            const userEntity = UserEntity.fromObject( user ); 
            const { password, ...userRegister } = userEntity

            const token = await JwtGenerator.generateToken({ id: user.id });
            if ( !token ) throw CustomError.internalServer('Error while creating JWT');

            return { userRegister,                                // tercer return un objeto con dos valores
                token: token,
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

    private sendEmailValidationLink = async( email: string ) => {  // solo para llamarlo aqui dentro
        
        // generar un token
        const token = await JwtGenerator.generateToken({ email });
        if( !token ) throw CustomError.internalServer('Error getting token');

        // provando desde la computadora
        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;

        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${ link }">Validate your email: ${ email } </a>
        `

        // se puede llamar directamente o se crean las opciones
        const optionsEmail = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail( optionsEmail );
        if( !isSent ) throw CustomError.internalServer('Error sending email')

        return true;

    }

    public validateEmail = async(token: string) => {

        const payload = await JwtGenerator.validateToken( token );
        if( !payload ) throw CustomError.unAuthorized('Invalid Token');

        const { email } = payload as { email: string };
        if( !email ) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({ email });
        if( !user ) throw CustomError.internalServer('Email not exists');

        user.emailValidated = true;
        await user.save();

        return true;
    }
}
