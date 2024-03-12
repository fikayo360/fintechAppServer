import express, { Router } from 'express';
const router:Router = express.Router()
import {notificationController} from "../controllers/index"
import authUser from '../middlewares/auth';

router.route("/new").post(authUser,notificationController.createNotification)
router.route("/allNotifications/:category").get(authUser,notificationController.getNotification)

export default router