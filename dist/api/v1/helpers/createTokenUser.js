"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createTokenUser = function (user) {
    return { username: user.username, userId: user.userId };
};
exports.default = createTokenUser;
