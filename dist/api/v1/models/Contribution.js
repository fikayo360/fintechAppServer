"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var postgresConfig_1 = __importDefault(require("../../../config/postgresConfig"));
var Campaign_1 = __importDefault(require("./Campaign"));
var Contribution = postgresConfig_1.default.define('Contribution', {
    campaignId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: Campaign_1.default,
            key: 'campaignId'
        }
    },
    contributionId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0.00,
    }
});
Contribution.sync().then(function () {
    console.log('contribution model synced successfully');
});
exports.default = Contribution;
