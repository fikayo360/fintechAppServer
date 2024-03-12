import { createJWT, isTokenValid } from './jwt';
import createTokenUser from './createTokenUser'; 

//import { checkPermissions } from './checkPermissions'; // ES module import

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser
};
