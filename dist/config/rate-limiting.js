"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_rate_limit_1 = require("express-rate-limit");
var limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
exports.default = limiter;
