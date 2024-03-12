"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tryCatch_1 = __importDefault(require("../helpers/tryCatch"));
var User_1 = __importDefault(require("../models/User"));
var validateEmail_1 = __importDefault(require("../helpers/validateEmail"));
var createTokenUser_1 = __importDefault(require("../helpers/createTokenUser"));
var jwt_1 = require("../helpers/jwt");
var uuid_1 = require("uuid");
var http_status_codes_1 = require("http-status-codes");
var sendResetToken_1 = __importDefault(require("../helpers/sendResetToken"));
var errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
var index_1 = require("../validations/joi/userValidations/index");
var bcrypt = require('bcryptjs');
var user = /** @class */ (function () {
    function user() {
        var _this = this;
        this.register = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, validationResult, _a, email, username, password, phonenumber, userExists, emailExists, phoneExists, hashedPassword, savedUser, tokenUser, cookie;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = (0, uuid_1.v4)();
                        validationResult = index_1.signupSchema.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _a = validationResult.value, email = _a.email, username = _a.username, password = _a.password, phonenumber = _a.phonenumber;
                        return [4 /*yield*/, User_1.default.findOne({ where: { username: username } })];
                    case 1:
                        userExists = _b.sent();
                        return [4 /*yield*/, User_1.default.findOne({ where: { email: email } })];
                    case 2:
                        emailExists = _b.sent();
                        return [4 /*yield*/, User_1.default.findOne({ where: { phonenumber: phonenumber } })];
                    case 3:
                        phoneExists = _b.sent();
                        if (userExists || emailExists || phoneExists) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('user already exists', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        hashedPassword = bcrypt.hashSync(password, 10);
                        return [4 /*yield*/, User_1.default.create({
                                userId: userId,
                                email: email,
                                username: username,
                                password: hashedPassword,
                                phonenumber: phonenumber
                            })];
                    case 4:
                        savedUser = _b.sent();
                        tokenUser = (0, createTokenUser_1.default)({ username: username, userId: userId });
                        cookie = (0, jwt_1.createJWT)(tokenUser);
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ cookie: cookie, savedUser: savedUser })];
                }
            });
        }); });
        this.login = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, _a, username, password, foundUser, _b, foundUserPassword, others, tokenUser, cookie;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        validationResult = index_1.loginSchema.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _a = validationResult.value, username = _a.username, password = _a.password;
                        return [4 /*yield*/, User_1.default.findOne({ where: { username: username } })];
                    case 1:
                        foundUser = _c.sent();
                        if (!foundUser) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)("that user does not exist", http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        if (!bcrypt.compareSync(password, foundUser.dataValues.password)) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('wrong password', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _b = foundUser.dataValues, foundUserPassword = _b.password, others = __rest(_b, ["password"]);
                        tokenUser = (0, createTokenUser_1.default)(others);
                        cookie = (0, jwt_1.createJWT)(tokenUser);
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json({ user: others, cookie: cookie })];
                }
            });
        }); });
        this.forgotPassword = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, email, sessionUser, reset, updateToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validationResult = index_1.forgotPasswordSchema.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        email = validationResult.value.email;
                        return [4 /*yield*/, User_1.default.findOne({ where: { email: email } })];
                    case 1:
                        sessionUser = _a.sent();
                        if ((0, validateEmail_1.default)(email) === false) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)("invalid_email", http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        if (!sessionUser) {
                            return [2 /*return*/, res.status(404).json((0, errorFormatter_1.default)('that user does not exist', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        reset = (0, sendResetToken_1.default)(sessionUser.dataValues.email);
                        return [4 /*yield*/, User_1.default.update({
                                resettoken: reset
                            }, {
                                where: {
                                    userId: sessionUser.dataValues.userId
                                }
                            })];
                    case 2:
                        updateToken = _a.sent();
                        return [2 /*return*/, res.status(200).json(" Reset token sent successfully")];
                }
            });
        }); });
        this.changePassword = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, _a, token, email, newPassword, sessionUser, hashedPassword, updated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validationResult = index_1.changePasswordSchema.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _a = validationResult.value, token = _a.token, email = _a.email, newPassword = _a.newPassword;
                        return [4 /*yield*/, User_1.default.findOne({ where: { email: email } })];
                    case 1:
                        sessionUser = _b.sent();
                        if (!(sessionUser.resettoken === token)) return [3 /*break*/, 4];
                        return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                    case 2:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, User_1.default.update({
                                resettoken: null,
                                password: hashedPassword
                            }, {
                                where: {
                                    userId: sessionUser.dataValues.userId
                                }
                            })];
                    case 3:
                        updated = _b.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('password updated successfully')];
                    case 4: return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('wrong user', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
            });
        }); });
        this.followUser = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var username, validationResult, friendName, friend, sessionUser, currentFriendIds, IdToAdd, updatedFriendIds, updateUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = req.user.username;
                        validationResult = index_1.followUser.validate(req.params);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        friendName = validationResult.value.friendName;
                        return [4 /*yield*/, User_1.default.findOne({
                                where: {
                                    username: friendName
                                },
                            })];
                    case 1:
                        friend = _a.sent();
                        if (!friend) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)("".concat(friendName, " not found"), http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        if (friendName === username) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('cant add yourself', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [4 /*yield*/, User_1.default.findOne({
                                where: {
                                    username: username
                                }
                            })];
                    case 2:
                        sessionUser = _a.sent();
                        currentFriendIds = sessionUser.dataValues.friendsIds || [];
                        IdToAdd = friend.dataValues.userId;
                        if (currentFriendIds.includes(IdToAdd)) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('freind already exsits', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        updatedFriendIds = __spreadArray(__spreadArray([], currentFriendIds, true), [IdToAdd], false);
                        return [4 /*yield*/, User_1.default.update({
                                friendsIds: updatedFriendIds
                            }, {
                                where: {
                                    userId: sessionUser.dataValues.userId
                                }
                            })];
                    case 3:
                        updateUser = _a.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('user succesfully added')];
                }
            });
        }); });
        this.searchAllUsers = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, username, allUsers, _a, password, rest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validationResult = index_1.searchSchema.validate(req.query);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        username = validationResult.value.username;
                        return [4 /*yield*/, User_1.default.findOne({
                                where: {
                                    username: username
                                }
                            })];
                    case 1:
                        allUsers = _b.sent();
                        if (!allUsers) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)("".concat(username, " not found"), http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _a = allUsers.dataValues, password = _a.password, rest = __rest(_a, ["password"]);
                        res.status(http_status_codes_1.StatusCodes.OK).json(rest);
                        return [2 /*return*/];
                }
            });
        }); });
        this.deleteUser = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, userId, deletedRows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validationResult = index_1.deleteSchema.validate(req.params);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        userId = validationResult.value.userId;
                        return [4 /*yield*/, User_1.default.destroy({
                                where: {
                                    userId: userId,
                                },
                            })];
                    case 1:
                        deletedRows = _a.sent();
                        if (deletedRows > 0) {
                            res.status(http_status_codes_1.StatusCodes.OK).json('user deleted succesfully ');
                        }
                        else {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)("user with this id ".concat(userId, " not found"), http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        this.verifyUser = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, verifyUser;
            return __generator(this, function (_a) {
                userId = req.user.userId;
                verifyUser = User_1.default.update({
                    isVerified: true
                }, {
                    where: {
                        userId: userId
                    }
                });
                if (!verifyUser) {
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)("error occured while verifying user ".concat(userId), http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
                return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('user verified succesfully')];
            });
        }); });
        this.completeProfile = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, validationResult, location, updateLocation;
            return __generator(this, function (_a) {
                userId = req.user.userId;
                validationResult = index_1.completeProfile.validate(req.body);
                if (validationResult.error) {
                    return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
                location = validationResult.value.location;
                updateLocation = User_1.default.update({
                    location: location
                }, {
                    where: {
                        userId: userId
                    }
                });
                if (!index_1.completeProfile) {
                    return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)("error occured while updating location", http_status_codes_1.StatusCodes.BAD_REQUEST))];
                }
                res.status(http_status_codes_1.StatusCodes.OK).json('updated succesfully');
                return [2 /*return*/];
            });
        }); });
    }
    return user;
}());
exports.default = new user;
