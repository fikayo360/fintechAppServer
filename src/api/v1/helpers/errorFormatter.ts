
import appError from "./appError"

const errorFormatter = (message:string,statusCode:number):{} => {
    let error = new appError(message,statusCode)
    return {
        statusCode: error.statusCode,
        message: error.message
    }
}

export default errorFormatter