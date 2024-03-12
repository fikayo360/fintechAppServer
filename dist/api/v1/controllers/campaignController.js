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
var http_status_codes_1 = require("http-status-codes");
var errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
var uuid_1 = require("uuid");
var Campaign_1 = __importDefault(require("../models/Campaign"));
var tryCatch_1 = __importDefault(require("../helpers/tryCatch"));
var newCampaign_1 = __importDefault(require("../validations/joi/campaignValidations/newCampaign"));
var campaign = /** @class */ (function () {
    function campaign() {
        var _this = this;
        this.createCampaign = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var campaignId, userId, validationResult, _a, title, description, campaignEnds, goal, createCampaign;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        campaignId = (0, uuid_1.v4)();
                        userId = req.user.userId;
                        validationResult = newCampaign_1.default.validate(req.body);
                        if (validationResult.error) {
                            return [2 /*return*/, res.status(400).json((0, errorFormatter_1.default)(validationResult.error.details[0].message, http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        _a = validationResult.value, title = _a.title, description = _a.description, campaignEnds = _a.campaignEnds, goal = _a.goal;
                        return [4 /*yield*/, Campaign_1.default.create({ userId: userId, campaignId: campaignId, title: title, description: description, campaignEnds: campaignEnds, goal: goal })];
                    case 1:
                        createCampaign = _b.sent();
                        if (!createCampaign) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('error occured while creating campaign', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json('campaign created successfully')];
                }
            });
        }); });
        this.getSingleCampaign = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var campId, campaign;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        campId = req.params.campId;
                        console.log(campId);
                        return [4 /*yield*/, Campaign_1.default.findOne({
                                where: {
                                    campaignId: campId
                                }
                            })];
                    case 1:
                        campaign = _a.sent();
                        if (!campaign) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('campaign not found', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(campaign.dataValues)];
                }
            });
        }); });
        this.getAllCampaign = (0, tryCatch_1.default)(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, campaigns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.user.userId;
                        return [4 /*yield*/, Campaign_1.default.findAll({
                                where: {
                                    userId: userId
                                }
                            })];
                    case 1:
                        campaigns = _a.sent();
                        if (!campaigns) {
                            return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json((0, errorFormatter_1.default)('campaigns not found', http_status_codes_1.StatusCodes.BAD_REQUEST))];
                        }
                        return [2 /*return*/, res.status(http_status_codes_1.StatusCodes.OK).json(campaigns)];
                }
            });
        }); });
    }
    return campaign;
}());
exports.default = new campaign();
