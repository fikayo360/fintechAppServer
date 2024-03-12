import { Request, Response } from 'express';
import errorFormatter from '../helpers/errorFormatter';
import tryCatch from '../helpers/tryCatch';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../models/Notification';
import {newNotification,getNotifications} from '../validations/joi/notifications'
import { StatusCodes } from 'http-status-codes';

class notification {
 public createNotification = tryCatch(async(req:Request,res:Response)=>{
    const notificationId = uuidv4();
    const userId = req.user.userId

    const validationResult = newNotification.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
    }
    const {message,category} = validationResult.value;
    const createNotification = await Notification.create({
        userId,notificationId,message,category
    })
    if(!createNotification){
        return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('error occured',StatusCodes.BAD_REQUEST))
      }
    return res.status(StatusCodes.CREATED).json('notification created successfully'); 
 })

 public getNotification = tryCatch(async(req:Request,res:Response)=>{
    const userId = req.user.userId
    const validationResult = getNotifications.validate(req.params);
    if (validationResult.error) {
      return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
    }
    const {category} = validationResult.value;
    const fetchAllNotifications:any = await Notification.findAll({
        raw:true,
        where: {category: category,userId:userId }
    })
    if(!fetchAllNotifications){
        return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('error occured',StatusCodes.BAD_REQUEST))
    }
    return res.status(StatusCodes.OK).json(fetchAllNotifications)
 })
}

export default new notification()