import tryCatch from "../helpers/tryCatch";
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import errorFormatter from "../helpers/errorFormatter";
import Transaction from '../models/Transaction';
import {newTransactionSchema} from "../validations/joi/transactionsValidations/index"
import Users from "../models/User";
import { v4 as uuidv4 } from 'uuid';
import logger from "../../../config/logger";
class transactionController {
    public createTransaction = tryCatch(async(req:Request,res:Response) =>{
        const transactionId = uuidv4()
        const userId = req.user.userId
        const validationResult = newTransactionSchema.validate(req.body);
        if (validationResult.error) {
          return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {transactionType,amountSent} = validationResult.value;

        const userExists = await Users.findOne({where:{userId:userId}})
        if(!userExists){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('user does not exists',StatusCodes.BAD_REQUEST))
         } 
      
         const newTransaction = await Transaction.create({
            userId,transactionId,transactionType,amountSent
          });
        logger.info('transaction created successfully');
        return res.status(StatusCodes.OK).json('transaction created successfully'); 
    })

    public fetchUserDeposits = tryCatch(async(req:Request,res:Response) => {
       
        const userId = req.user.userId
    
        const allDeposits:any = await Transaction.findAll({
          raw:true,
          where:{
               userId:userId,
               transactionType:'deposits'
          }
          })
          if(!allDeposits){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('not found',StatusCodes.BAD_REQUEST))
          }
          return res.status(StatusCodes.OK).json(allDeposits)
    })

    public fetchUserWithdraws = tryCatch(async(req:Request,res:Response) =>{
        const userId = req.user.userId 
        const allWithdrawals:any = await Transaction.findAll({
          raw:true,
          where:{
               userId:userId,
               transactionType:'withdrawals'
          }
          })
          if(!allWithdrawals){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('not found',StatusCodes.BAD_REQUEST))
          }
          return res.status(StatusCodes.OK).json(allWithdrawals)
    })

    public fetchAllTransactions = tryCatch(async(req:Request,res:Response) =>{
        const userId = req.user.userId
        const allTransactions:any = await Transaction.findAll({
          raw:true,
          where:{
               userId:userId
          }
          })
          if(!allTransactions){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('not found',StatusCodes.BAD_REQUEST))
          }
          return res.status(StatusCodes.OK).json(allTransactions)
    })
}

export default new transactionController