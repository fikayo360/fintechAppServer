"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var verifyBankAcc = joi_1.default.object({
    accNo: joi_1.default.string().required().length(10),
    bankName: joi_1.default.string().required()
});
exports.default = verifyBankAcc;
