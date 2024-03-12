"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = exports.createJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createJWT = function (_a) {
    var userId = _a.userId, username = _a.username;
    var tokenUser = { userId: userId, username: username };
    console.log(process.env.JWT_LIFETIME);
    var token = jsonwebtoken_1.default.sign(tokenUser, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    return token;
};
exports.createJWT = createJWT;
var isTokenValid = function (token) { return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); };
exports.isTokenValid = isTokenValid;
