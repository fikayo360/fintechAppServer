"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var transferWallet = joi_1.default.object({
    amountSent: joi_1.default.number().precision(2).required(),
    receiverId: joi_1.default.string().uuid({ version: 'uuidv4' }).required(),
});
exports.default = transferWallet;
