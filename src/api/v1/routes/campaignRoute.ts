import express, { Router } from 'express';
const router:Router = express.Router()
import {campaignController} from "../controllers/index"
import authUser from '../middlewares/auth';

router.route("/new").post(authUser,campaignController.createCampaign)
router.route("/singleCampaign/:campId").get(authUser,campaignController.getSingleCampaign)
router.route("/allCampaigns").get(authUser,campaignController.getAllCampaign)


export default router