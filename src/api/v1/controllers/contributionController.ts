import { Request, Response } from 'express';
import tryCatch from '../helpers/tryCatch';
import { StatusCodes } from 'http-status-codes';
import errorFormatter from '../helpers/errorFormatter';
import Contribution from '../models/Contribution';
import Campaign from '../models/Campaign';
import {newContribution,fetchContributions} from "../validations/joi/contributions"
import { v4 as uuidv4 } from 'uuid';
import sequelizee from '../../../config/postgresConfig';
import logger from '../../../config/logger';

class contributionController {

    public newContribution = tryCatch(async(req:Request,res:Response) => {
        const contributionId = uuidv4();
        const validationResult = newContribution.validate(req.body);
        if (validationResult.error) {
          return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {campaignId,amount} = validationResult.value;
        try {
            await sequelizee.transaction(async(t) => {
                const createContribution = await Contribution.create({
                    contributionId,campaignId,amount
                },{transaction:t})
                
                const correspondingCampaign:any = await Campaign.findOne({
                    where:{
                        campaignId:campaignId
                    },transaction:t
                })

                const creditCampaign = await correspondingCampaign.increment('amountRaised', { by:amount, transaction:t });
            })
            logger.info(`contribution created succesfully for campaign ${campaignId}  `)
            return res.status(StatusCodes.CREATED).json('contribution added')
            
          } catch (error:any) {
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(error,StatusCodes.BAD_REQUEST))
          }
    })

    public allCampaignContributions = tryCatch(async(req:Request,res:Response) => {
     
        const validationResult = fetchContributions.validate(req.params);

        if (validationResult.error) {
          return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }

        const {campaignId} = validationResult.value;
        const contributions:any = await Contribution.findAll({
            raw:true,
            where:{
                campaignId:campaignId
            }  
        })
        if(!contributions){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('contributions not found',StatusCodes.BAD_REQUEST))
        }
        
        return res.status(StatusCodes.OK).json(contributions)
    })
}

export default new contributionController()