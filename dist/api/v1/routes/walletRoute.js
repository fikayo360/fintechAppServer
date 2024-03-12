"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_1 = __importDefault(require("../middlewares/auth"));
var index_1 = require("../controllers/index");
router.route("/new").post(auth_1.default, index_1.walletController.createWallet);
router.route("/verifyAcc").get(auth_1.default, index_1.walletController.verifyBankAcc);
router.route("/deposit").post(auth_1.default, index_1.walletController.deposit);
router.route("/transferWallet").post(auth_1.default, index_1.walletController.transferMoneyWallet);
router.route("/balance").get(auth_1.default, index_1.walletController.getWalletBalance);
exports.default = router;
