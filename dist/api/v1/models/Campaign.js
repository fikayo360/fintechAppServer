"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../../../config/postgresConfig"));
var User_1 = __importDefault(require("./User"));
var Campaign = postgresConfig_1.default.define('Campaign', {
    campaignId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'userId'
        }
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    goal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    amountRaised: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    campaignEnds: {
        type: sequelize_1.DataTypes.DATE
    }
});
Campaign.sync().then(function () {
    console.log("campaign Model synced");
});
exports.default = Campaign;
