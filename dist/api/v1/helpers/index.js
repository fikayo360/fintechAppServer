"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_1 = require("./jwt");
var createTokenUser_1 = __importDefault(require("./createTokenUser"));
//import { checkPermissions } from './checkPermissions'; // ES module import
module.exports = {
    createJWT: jwt_1.createJWT,
    isTokenValid: jwt_1.isTokenValid,
    createTokenUser: createTokenUser_1.default
};
