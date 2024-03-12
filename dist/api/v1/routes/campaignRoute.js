"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var index_1 = require("../controllers/index");
var auth_1 = __importDefault(require("../middlewares/auth"));
router.route("/new").post(auth_1.default, index_1.campaignController.createCampaign);
router.route("/singleCampaign/:campId").get(auth_1.default, index_1.campaignController.getSingleCampaign);
router.route("/allCampaigns").get(auth_1.default, index_1.campaignController.getAllCampaign);
exports.default = router;
