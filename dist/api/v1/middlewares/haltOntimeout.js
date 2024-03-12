"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function haltOnTimedout(req, res, next) {
    if (!req.timedout)
        next();
}
exports.default = haltOnTimedout;
