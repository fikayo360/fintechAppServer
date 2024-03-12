"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var newTransactionSchema = joi_1.default.object({
    transactionType: joi_1.default.string().required(),
    amountSent: joi_1.default.number().precision(2).required(),
});
exports.default = newTransactionSchema;
