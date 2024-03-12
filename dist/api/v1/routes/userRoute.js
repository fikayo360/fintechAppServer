"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_1 = __importDefault(require("../middlewares/auth"));
var index_1 = require("../controllers/index");
router.route("/signup").post(index_1.user.register);
router.route("/login").post(index_1.user.login);
router.route("/forgot").post(index_1.user.forgotPassword);
router.route("/change").post(index_1.user.changePassword);
router.route("/follow/:friendName").get(auth_1.default, index_1.user.followUser);
router.route("/search").get(auth_1.default, index_1.user.searchAllUsers);
router.route("/delete/:userId").delete(auth_1.default, index_1.user.deleteUser);
router.route("/verifyUser").get(auth_1.default, index_1.user.verifyUser);
router.route("/completeProfile").post(auth_1.default, index_1.user.completeProfile);
exports.default = router;
