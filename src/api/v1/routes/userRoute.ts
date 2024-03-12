import express, { Router } from 'express';
const router:Router = express.Router()
import authUser from '../middlewares/auth';
import {user} from '../controllers/index'

router.route("/signup").post(user.register)
router.route("/login").post(user.login)
router.route("/forgot").post(user.forgotPassword)
router.route("/change").post(user.changePassword)
router.route("/follow/:friendName").get(authUser,user.followUser)
router.route("/search").get(authUser,user.searchAllUsers)
router.route("/delete/:userId").delete(authUser,user.deleteUser)
router.route("/verifyUser").get(authUser,user.verifyUser)
router.route("/completeProfile").post(authUser,user.completeProfile)

export default router