import { Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

interface payloadData  {
  payload:jwtUser
}
interface jwtUser{
  username:string,
  userId:string
}

const createJWT = ({userId,username}:jwtUser) => {
  let tokenUser = {userId,username}
  const token: string = jwt.sign(tokenUser, process.env.JWT_SECRET as Secret, {
    expiresIn:process.env.JWT_LIFETIME
  });
  return token;
};

const isTokenValid = (token: string) => jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;

 export {
  createJWT,
  isTokenValid
};
