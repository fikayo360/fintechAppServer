"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var newNotification = joi_1.default.object({
    message: joi_1.default.string().required(),
    category: joi_1.default.string().required()
});
exports.default = newNotification;
