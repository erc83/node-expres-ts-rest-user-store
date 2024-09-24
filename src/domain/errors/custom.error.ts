
export class CustomError extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super(message);
    }

    // factory contructores
    static badRequest(message: string){
        return new CustomError(400, message);
    }

    static unAuthorized(message: string){
        return new CustomError(401, message);
    }

    static forbidden(message: string){
        return new CustomError(403, message);
    }

    static notFound(message: string){
        return new CustomError(404, message);
    }

    static internalServer(message: string){
        return new CustomError(500, message);
    }

}

// cuando queremos mandar un codigo de errro badRequest
CustomError.badRequest('usuario descripcion del error') // automaticamente coloca el error 400



