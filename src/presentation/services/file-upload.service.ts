

export class FileUploadService {

    //DI
    constructor() {

    }

    private checkFolder( folderPath: string ) {
        throw new Error('Not implemented')
    }

    uploadSingle(
        file: any,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {
        
    }
    
    public uploadMultiple(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {

    }



}

