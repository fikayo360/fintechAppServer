"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newNotification = exports.getNotifications = void 0;
var getNotification_1 = __importDefault(require("./getNotification"));
exports.getNotifications = getNotification_1.default;
var createNotification_1 = __importDefault(require("./createNotification"));
exports.newNotification = createNotification_1.default;
