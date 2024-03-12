import express, { Router } from 'express';
const router:Router = express.Router()
import {contributionController} from "../controllers/index"
import authUser from '../middlewares/auth';

router.route("/new").post(authUser,contributionController.newContribution)
router.route("/all/:campaignId").get(authUser,contributionController.allCampaignContributions)

export default router