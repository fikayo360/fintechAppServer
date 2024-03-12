"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../../../config/postgresConfig"));
var Users = postgresConfig_1.default.define('User', {
    userId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    phonenumber: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    friendsIds: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: []
    },
    location: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    resettoken: {
        type: sequelize_1.DataTypes.STRING(255),
    }
});
Users.sync().then(function () {
    console.log("User Model synced");
});
exports.default = Users;
