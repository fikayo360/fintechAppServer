"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferMoney = exports.transferWallet = exports.verifyBankAcc = exports.newWalletSchema = void 0;
var createWallet_1 = __importDefault(require("./createWallet"));
exports.newWalletSchema = createWallet_1.default;
var verifyBankAcc_1 = __importDefault(require("./verifyBankAcc"));
exports.verifyBankAcc = verifyBankAcc_1.default;
var transferToWallet_1 = __importDefault(require("./transferToWallet"));
exports.transferWallet = transferToWallet_1.default;
var transferMoney_1 = __importDefault(require("./transferMoney"));
exports.transferMoney = transferMoney_1.default;
