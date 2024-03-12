"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = exports.contributionController = exports.campaignController = exports.walletController = exports.transactionController = exports.user = void 0;
var userController_1 = __importDefault(require("./userController"));
exports.user = userController_1.default;
var transactionController_1 = __importDefault(require("./transactionController"));
exports.transactionController = transactionController_1.default;
var walletController_1 = __importDefault(require("./walletController"));
exports.walletController = walletController_1.default;
var campaignController_1 = __importDefault(require("./campaignController"));
exports.campaignController = campaignController_1.default;
var notificationController_1 = __importDefault(require("./notificationController"));
exports.notificationController = notificationController_1.default;
var contributionController_1 = __importDefault(require("./contributionController"));
exports.contributionController = contributionController_1.default;
