import express, { Router } from 'express';
const router:Router = express.Router()
import authUser from '../middlewares/auth';
import {walletController} from '../controllers/index'

router.route("/new").post(authUser,walletController.createWallet)
router.route("/verifyAcc").get(authUser,walletController.verifyBankAcc)
router.route("/deposit").post(authUser,walletController.deposit)
router.route("/transferWallet").post(authUser,walletController.transferMoneyWallet)
router.route("/balance").get(authUser,walletController.getWalletBalance)

export default router