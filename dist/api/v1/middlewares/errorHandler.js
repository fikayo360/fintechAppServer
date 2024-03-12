"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appError_1 = __importDefault(require("../helpers/appError"));
var errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
var ErrorHandler = function (err, req, res, next) {
    if (err instanceof appError_1.default) {
        return res.status(err.statusCode).json((0, errorFormatter_1.default)(err.message, err.statusCode));
    }
    return res.status(500).send("Something went wrong");
};
exports.default = ErrorHandler;
