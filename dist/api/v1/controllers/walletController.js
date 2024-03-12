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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tryCatch_1 = __importDefault(require("../helpers/tryCatch"));
var Wallets_1 = __importDefault(require("../models/Wallets"));
var http_status_codes_1 = require("http-status-codes");
var errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
var uuid_1 = require("uuid");
var index_1 = require("../validations/joi/walletValidations/index");
var filterBankList_1 = require("../helpers/filterBankList");
var User_1 = __importDefault(require("../models/User"));
var axios_1 = __importDefault(require("axios"));
var postgresConfig_1 = __importDefault(require("../../../config/postgresConfig"));
var wallet = /** @class */ (function () {
    function wallet() {
        var _this = this;
        this.createWallet = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var walletId, userId, userExists, newWallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletId = (0, uuid_1.v4)();
                        userId = req.user.userId;
                        return [4 /*yield*/, User_1.default.findOne({ where: { userId: userId } })];
                    case 1:
                        userExists = _a.sent();
                        if (!userExists) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('user does not exists', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [4 /*yield*/, Wallets_1.default.create({
                                userId: userId,
                                walletId: walletId
                            })];
                    case 2:
                        newWallet = _a.sent();
                        if (!newWallet) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('error occured', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('wallet created successfully')];
                }
            });
        }); });
        this.verifyBankAcc = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var validationResult, _a, accNo, bankName, bankCode, hostName, url, headers, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        validationResult = index_1.verifyBankAcc.validate(req.query);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _a = validationResult.value, accNo = _a.accNo, bankName = _a.bankName;
                        bankCode = (0, filterBankList_1.filterBankList)(bankName);
                        if (bankCode === "bank not found") {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('that bank no dey my bro', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        console.log(bankCode, accNo);
                        hostName = 'https://api.paystack.co';
                        url = "".concat(hostName, "/bank/resolve?account_number=").concat(accNo, "&bank_code=").concat(bankCode);
                        headers = {
                            Authorization: 'Bearer sk_live_2c48de516a22012dd656eb6718022ab598b88c3e'
                        };
                        return [4 /*yield*/, axios_1.default.get(url, { headers: headers })];
                    case 1:
                        response = _b.sent();
                        if (!response) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('yawa don gas bro', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json(response.data);
                        console.log(response.data);
                        return [2 /*return*/];
                }
            });
        }); });
        this.transferMoneyWallet = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var senderId, validationResult, _a, amountSent, receiverId, sender, sendersWallet, receiver, receiversWallet, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        senderId = req.user.userId;
                        validationResult = index_1.transferWallet.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _a = validationResult.value, amountSent = _a.amountSent, receiverId = _a.receiverId;
                        return [4 /*yield*/, User_1.default.findOne({
                                where: {
                                    userId: senderId
                                }
                            })];
                    case 1:
                        sender = _b.sent();
                        return [4 /*yield*/, Wallets_1.default.findOne({
                                where: {
                                    userId: senderId
                                }
                            })];
                    case 2:
                        sendersWallet = _b.sent();
                        return [4 /*yield*/, User_1.default.findOne({
                                where: {
                                    userId: receiverId
                                }
                            })];
                    case 3:
                        receiver = _b.sent();
                        return [4 /*yield*/, Wallets_1.default.findOne({
                                where: {
                                    userId: receiverId
                                }
                            })];
                    case 4:
                        receiversWallet = _b.sent();
                        if (!sender || !sendersWallet || !receiver || !receiversWallet) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('an error occured', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        if (amountSent > sendersWallet.dataValues.balance) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)('you dont have up to that amount', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, postgresConfig_1.default.transaction(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                var debitSender, creditReceiver;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, sendersWallet.decrement('balance', { by: amountSent, transaction: t })];
                                        case 1:
                                            debitSender = _a.sent();
                                            return [4 /*yield*/, receiversWallet.increment('balance', { by: amountSent, transaction: t })];
                                        case 2:
                                            creditReceiver = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('transfer success')];
                    case 7:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)(error_1, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        // public transferMoneyAcc = tryCatch(async(req:Request,res:Response) =>{
        //  till we get the paystack transfer api
        //   const validationResult:any = transferWallet.validate(req.body);
        //   if (validationResult.error) {
        //     return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        //   }
        //   const {amount,senderId,receiverAcc} = validationResult.value;
        //   const sender = await Users.findOne({
        //     where:{
        //      userId:senderId 
        //     }
        //   })
        //   const sendersWallet:any = await Wallet.findOne({
        //     where:{
        //       userId:senderId
        //     }
        //   })
        //   await sendersWallet.decrement('amount', { by:amount });
        // })
        this.getWalletBalance = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user, associatedWallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        return [4 /*yield*/, User_1.default.findOne({
                                where: {
                                    userId: userId
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, Wallets_1.default.findOne({
                                where: {
                                    userId: userId
                                }
                            })];
                    case 2:
                        associatedWallet = _a.sent();
                        if (!user || !associatedWallet) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('an error occured', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(associatedWallet.balance)];
                }
            });
        }); });
        this.deposit = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var amount, userId, user, associatedWallet, creditUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amount = req.body.amount;
                        userId = req.user.userId;
                        return [4 /*yield*/, User_1.default.findOne({
                                where: {
                                    userId: userId
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, Wallets_1.default.findOne({
                                where: {
                                    userId: userId
                                }
                            })];
                    case 2:
                        associatedWallet = _a.sent();
                        if (!user || !associatedWallet) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('an error occured', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [4 /*yield*/, associatedWallet.increment('balance', { by: amount })];
                    case 3:
                        creditUser = _a.sent();
                        if (!creditUser) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('an error occured', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('amount succesfully credited')];
                }
            });
        }); });
    }
    return wallet;
}());
exports.default = new wallet;
