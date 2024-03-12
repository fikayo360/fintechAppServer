import tryCatch from "../helpers/tryCatch";
import Wallet from "../models/Wallets";
import { Request, Response} from 'express';
import { StatusCodes } from "http-status-codes";
import errorFormatter from "../helpers/errorFormatter";
import { v4 as uuidv4 } from 'uuid';
import {verifyBankAcc,transferWallet,transferMoney} from "../validations/joi/walletValidations/index"
import { filterBankList } from "../helpers/filterBankList";
import Users from "../models/User";
import axios from "axios"
import sequelizee from "../../../config/postgresConfig";
import logger from "../../../config/logger";
import { log } from "console";

class wallet {
    public createWallet = tryCatch(async(req:Request,res:Response) => {
        const walletId = uuidv4()
        const userId = req.user.userId
        const userExists = await Users.findOne({where:{userId:userId}})
        if(!userExists){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('user does not exists',StatusCodes.BAD_REQUEST))
         } 
         const newWallet = await Wallet.create({
            userId,walletId
          })
          if(!newWallet){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('error occured',StatusCodes.BAD_REQUEST))
          }
        logger.info(`wallet with ${walletId} created successfully`)
        return res.status(StatusCodes.CREATED).json('wallet created successfully'); 
    })

    public verifyBankAcc = tryCatch(async(req:Request,res:Response) => {
      const validationResult = verifyBankAcc.validate(req.query);
        if (validationResult.error) {
          return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {accNo,bankName} = validationResult.value;
        const bankCode = filterBankList(bankName)
        if (bankCode === "bank not found"){
          return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('that bank no dey my bro',StatusCodes.BAD_REQUEST))
        }
        console.log(bankCode,accNo);
        const hostName = 'https://api.paystack.co'
        const url = `${hostName}/bank/resolve?account_number=${accNo}&bank_code=${bankCode}`
        const headers = {
          Authorization: `Bearer ${process.env.PAYSTACK_KEY}`
      };

        const response = await axios.get(url,{headers})
        if(!response){
          return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('yawa don gas bro',StatusCodes.BAD_REQUEST))
        }
        res.status(StatusCodes.OK).json(response.data)
        console.log(response.data);
        
    })

    public transferMoneyWallet = tryCatch(async(req:Request,res:Response) =>{
      const senderId = req.user.userId
      const validationResult:any = transferWallet.validate(req.body);
        if (validationResult.error) {
          return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
        }
        const {amountSent,receiverId} = validationResult.value;
      
        const sender = await Users.findOne({
          where:{
           userId:senderId 
          }
        })

        const sendersWallet:any = await Wallet.findOne({
          where:{
            userId:senderId
          }
        })

        const receiver = await Users.findOne({
          where:{
            userId:receiverId
          }
        })

        const receiversWallet:any = await Wallet.findOne({
          where:{
            userId:receiverId
          }
        })

        if(!sender || !sendersWallet || !receiver || !receiversWallet){
          logger.error(`cant transfer cause inputs are invalid`)
          return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('an error occured',StatusCodes.BAD_REQUEST))
        }

        if( amountSent > sendersWallet.dataValues.balance){
          logger.error(`${sender.dataValues.username} does not have up to that amount`)
          return res.status(400).json(errorFormatter('you dont have up to that amount',StatusCodes.BAD_REQUEST));
        }
      
        try {
          await sequelizee.transaction(async(t) => {
            const debitSender = await sendersWallet.decrement('balance', { by:amountSent, transaction:t });
            const creditReceiver = await receiversWallet.increment('balance', { by:amountSent, transaction:t });
          });
          logger.info(`${sender.dataValues.username} sent ${amountSent} to ${receiver.dataValues.username}`)
          return res.status(StatusCodes.OK).json('transfer success')
          
        } catch (error:any) {
          logger.error(error)
          return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(error,StatusCodes.BAD_REQUEST))
        }
        
    })

    // public transferMoneyAcc = tryCatch(async(req:Request,res:Response) =>{
     //  till we get the paystack transfer api
    // })

    public getWalletBalance = tryCatch(async(req:Request,res:Response) =>{
      const userId = req.user.userId
      const user = await Users.findOne({
        where:{
          userId: userId
        }
      })
      const associatedWallet:any = await Wallet.findOne({
        where:{
          userId:userId
        }
      })
      if(!user || !associatedWallet){
        return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('an error occured',StatusCodes.BAD_REQUEST))
      }
      return res.status(StatusCodes.OK).json(associatedWallet.balance)
    })

    public deposit = tryCatch(async(req:Request,res:Response) =>{
      const {amount} = req.body
      const userId = req.user.userId
      const user = await Users.findOne({
        where:{
          userId: userId
        }
      })
      const associatedWallet:any = await Wallet.findOne({
        where:{
          userId:userId
        }
      })

      if(!user || !associatedWallet){
        return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('an error occured',StatusCodes.BAD_REQUEST))
      }

      const creditUser = await associatedWallet.increment('balance',{ by: amount })

      if (!creditUser) {
        return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('an error occured',StatusCodes.BAD_REQUEST))
      }
      logger.info(`${amount} deposited succesfully for ${user.dataValues.username}`)
      return res.status(StatusCodes.OK).json('amount succesfully credited')
    })
}

export default new wallet