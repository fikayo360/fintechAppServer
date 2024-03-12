import appError from "../helpers/appError";
import { Request, Response, NextFunction } from 'express';
import errorFormatter from "../helpers/errorFormatter";
import logger from "../../../config/logger";

const ErrorHandler = (err:any,req:Request,res:Response,next:NextFunction) => {
    
      if (err instanceof appError) {
        logger.error(err.message)
        return res.status(err.statusCode).json(errorFormatter(err.message,err.statusCode));
      }

      logger.error('something went wrong')
      return res.status(500).send("Something went wrong");
}

export default ErrorHandler