import { Request, Response, response } from 'express';
import { StatusCodes } from "http-status-codes";
import errorFormatter from '../helpers/errorFormatter';
import { v4 as uuidv4 } from 'uuid';
import Campaign from '../models/Campaign';
import tryCatch from '../helpers/tryCatch';
import newCampaign from '../validations/joi/campaignValidations/newCampaign';
import logger from '../../../config/logger';

class campaign {
    public createCampaign = tryCatch(async(req:Request,res:Response) => {
        const campaignId = uuidv4()
        const userId = req.user.userId
        const validationResult = newCampaign.validate(req.body);
        if (validationResult.error) {
          return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {title,description,campaignEnds,goal} = validationResult.value;
        const createCampaign = await Campaign.create({userId,campaignId,title,description,campaignEnds,goal})
        if (!createCampaign){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('error occured while creating campaign',StatusCodes.BAD_REQUEST))
        }
        logger.info(`campaign created successfully for user ${userId}`)
        return res.status(StatusCodes.CREATED).json('campaign created successfully')
    })

    public getSingleCampaign = tryCatch(async(req:Request,res:Response) => {
        const {campId} = req.params
        console.log(campId);
        const campaign:any = await Campaign.findOne({
            where:{
                campaignId:campId
            }
        })
        if (!campaign){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('campaign not found',StatusCodes.BAD_REQUEST))
        }
        return res.status(StatusCodes.OK).json(campaign.dataValues)
    })

    public getAllCampaign = tryCatch(async(req:Request,res:Response) => {
        const userId = req.user.userId
        const campaigns:any = await Campaign.findAll({
            where:{
                userId:userId
            }
        })
        if (!campaigns){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('campaigns not found',StatusCodes.BAD_REQUEST))
        }
        return res.status(StatusCodes.OK).json(campaigns)
    })
}

export default new campaign()