import express, { Router } from 'express';
const router:Router = express.Router()
import {transactionController} from "../controllers/index"
import authUser from '../middlewares/auth';

router.route("/new").post(authUser,transactionController.createTransaction)
router.route("/fetchDeposits").get(authUser,transactionController.fetchUserDeposits)
router.route("/fetchWithdrawals").get(authUser,transactionController.fetchUserWithdraws)
router.route("/allTransactions").get(authUser,transactionController.fetchAllTransactions)

export default router