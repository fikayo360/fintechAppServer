"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
var validateRequestBody = function (req, res, next) {
    var schema = joi_1.default.object().pattern(/./, joi_1.default.string().required());
    var validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json((0, errorFormatter_1.default)('All properties in the request body must be non-empty strings.', 400));
    }
    next();
};
exports.default = validateRequestBody;
