"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appError_1 = __importDefault(require("./appError"));
var errorFormatter = function (message, statusCode) {
    var error = new appError_1.default(message, statusCode);
    return {
        statusCode: error.statusCode,
        message: error.message
    };
};
exports.default = errorFormatter;
