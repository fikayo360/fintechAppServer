"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var changePasswordSchema = joi_1.default.object({
    token: joi_1.default.string().required().max(6),
    email: joi_1.default.string().required().email(),
    newPassword: joi_1.default.string().required().min(4)
});
exports.default = changePasswordSchema;
