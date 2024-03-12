"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../../../config/postgresConfig"));
var User_1 = __importDefault(require("./User"));
var Transaction = postgresConfig_1.default.define('Transaction', {
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'userId'
        }
    },
    transactionId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    transactionType: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    senderId: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    receiverId: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    amountSent: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: false
    }
});
Transaction.sync().then(function () {
    console.log('transaction model synced successfully');
});
exports.default = Transaction;
