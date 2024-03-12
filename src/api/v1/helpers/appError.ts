

class appError extends Error{
    statusCode: number;
    constructor(message:string,statusCode:number){
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, appError.prototype);
    }
    toString(): object {
        return {error:this.message, statusCode:this.statusCode};
    }
}

export default appError;