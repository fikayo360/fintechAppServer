"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../../../config/postgresConfig"));
var User_1 = __importDefault(require("./User"));
var Notification = postgresConfig_1.default.define('Notification', {
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'userId'
        }
    },
    notificationId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    message: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
});
Notification.sync().then(function () {
    console.log('notification model synced successfully');
});
exports.default = Notification;
