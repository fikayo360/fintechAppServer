"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var transferMoney = joi_1.default.object({
    amount: joi_1.default.number().precision(2).required(),
    senderId: joi_1.default.string().uuid({ version: 'uuidv4' }).required(),
    receiverAcc: joi_1.default.string().required().length(10),
});
exports.default = transferMoney;
