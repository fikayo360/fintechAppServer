import { Request, Response,NextFunction } from 'express';
import { isTokenValid } from '../helpers/jwt';
import { StatusCodes } from 'http-status-codes';
import TokenPayload from '../interfaces/tokenPayload';
import logger from '../../../config/logger';
  const authUser = async (req:Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      logger.error('no token! access denied')
      return res.status(400).json("no token! access denied");
    }
  
    const tokenData = authHeader.split(" ");
    const token = tokenData[1]; 
    try {
      const { username, userId } =  isTokenValid(token) as TokenPayload;
      req.user = { username, userId };
      next();
    } catch (error) {
        logger.error('token expired')
        res.status(StatusCodes.UNAUTHORIZED).json("Token expired");
    }
  };

  export default authUser