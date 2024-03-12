import { Request, Response,NextFunction } from 'express';

function haltOnTimedout (req:Request, res:Response, next:NextFunction) {
    if (!req.timedout) next()
  }

export default haltOnTimedout