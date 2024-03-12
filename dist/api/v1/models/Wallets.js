"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../../../config/postgresConfig"));
var User_1 = __importDefault(require("./User"));
var Wallet = postgresConfig_1.default.define('Wallet', {
    walletId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    balance: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        defaultValue: 0.00,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        unique: true,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'userId'
        }
    },
});
Wallet.sync().then(function () {
    console.log("wallet Model synced");
});
exports.default = Wallet;
