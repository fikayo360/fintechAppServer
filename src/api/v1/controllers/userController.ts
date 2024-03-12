import tryCatch from "../helpers/tryCatch";
import Users from "../models/User";
import { Request, Response } from 'express';
import validateEmail from "../helpers/validateEmail";
import createTokenUser from "../helpers/createTokenUser";
import { createJWT } from "../helpers/jwt";
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from "http-status-codes";
import sendResetToken from "../helpers/sendResetToken";
import errorFormatter from "../helpers/errorFormatter";
import logger from "../../../config/logger";
import {signupSchema, loginSchema, forgotPasswordSchema, changePasswordSchema,followUser,searchSchema,completeProfile,deleteSchema} from '../validations/joi/userValidations/index'
let bcrypt = require('bcryptjs');


class user {
    public register = tryCatch(
        async (req: Request, res: Response) =>{
          const userId = uuidv4();
          const validationResult = signupSchema.validate(req.body);
          if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
          }
          const {email,username,password,phonenumber} = validationResult.value;

          const userExists = await Users.findOne({where:{username:username}})
          const emailExists = await Users.findOne({where:{email:email}})
          const phoneExists = await Users.findOne({where:{phonenumber:phonenumber}})
  
          if(userExists || emailExists || phoneExists){
            logger.error('user already exists')
             return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('user already exists',StatusCodes.BAD_REQUEST))
          } 
          
          const hashedPassword = bcrypt.hashSync(password, 10);
        
            const savedUser:any = await Users.create({
              userId,email,username,password:hashedPassword,phonenumber
            });
            logger.info(`${username} was created succesfully`)

            const tokenUser = createTokenUser({username,userId})
            const cookie = createJWT(tokenUser)
            return res.status(StatusCodes.CREATED).json({cookie,savedUser}); 
        }
      )
  
        public login = tryCatch (
          async (req: Request, res: Response) => {
            const validationResult = loginSchema.validate(req.body);
            if (validationResult.error) {
              return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
            }
            const {username,password} = validationResult.value;
              
                const foundUser:any = await Users.findOne({where:{username:username}})
             
                if(!foundUser){
                    return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter("that user does not exist",StatusCodes.BAD_REQUEST))
                }
                
                if(!bcrypt.compareSync(password,foundUser.dataValues.password)){
                   return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('wrong password',StatusCodes.BAD_REQUEST))
                 }
                 const { password:foundUserPassword, ...others } = foundUser.dataValues;
                 const tokenUser = createTokenUser(others);
                 const cookie = createJWT(tokenUser)
                 logger.info(`${foundUser.username} logged in succesfully`)
                 return res.status(StatusCodes.OK).json({ user: others,cookie });
           }
        )
  
         public forgotPassword = tryCatch(
          async (req: Request, res: Response) => {
            const validationResult = forgotPasswordSchema.validate(req.body);
            if (validationResult.error) {
              return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
            }
            const {email} = validationResult.value
            const sessionUser:any = await Users.findOne({where:{email:email}})
            if(validateEmail(email) === false){
              return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter("invalid_email",StatusCodes.BAD_REQUEST))
          }
            if (!sessionUser){
                return res.status(404).json(errorFormatter('that user does not exist',StatusCodes.BAD_REQUEST))
            }
            
            let reset = sendResetToken(sessionUser.dataValues.email)
            const updateToken = await Users.update({
                resettoken: reset
              }, {
                where: {
                  userId: sessionUser.dataValues.userId
                }
              });
            logger.info(`${sessionUser.dataValues.username} tried to update is password`)
            return res.status(200).json(` Reset token sent successfully`)
            }
         )
    
         public changePassword = tryCatch(
          async (req: Request, res: Response) =>{
            const validationResult = changePasswordSchema.validate(req.body);
            if (validationResult.error) {
              return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
            }
            const {token,email,newPassword} = validationResult.value
            
            const sessionUser:any = await Users.findOne({where:{email:email}})
                if(sessionUser.resettoken === token){
                  const hashedPassword = await bcrypt.hash(newPassword, 10);
                  const updated = await Users.update({
                    resettoken: null,
                    password: hashedPassword
                  }, {
                    where: {
                      userId: sessionUser.dataValues.userId
                    }
                  });
                logger.info(`${sessionUser.dataValues.username} updated his password succesfully`)
                return res.status(StatusCodes.OK).json('password updated successfully');
                }
                else{
                    return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('wrong user',StatusCodes.BAD_REQUEST));
                }
               
           }
         )

         public followUser = tryCatch(async(req:Request,res:Response)=>{
          const username = req.user.username
          
          const validationResult = followUser.validate(req.params);
            if (validationResult.error) {
              return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
            }
            const {friendName} = validationResult.value
        
            const friend:any = await Users.findOne({
              where: {
                username: friendName
              },
            });

            if (!friend) {
              return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(`${friendName} not found`,StatusCodes.BAD_REQUEST))
            }
        
            if (friendName === username) {
              return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('cant add yourself',StatusCodes.BAD_REQUEST))
            }

            const sessionUser:any = await Users.findOne({
              where:{
                username:username
              }
            })

            const currentFriendIds = sessionUser.dataValues.friendsIds || [];
            const IdToAdd = friend.dataValues.userId
            if(currentFriendIds.includes(IdToAdd)){
              return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter('freind already exsits',StatusCodes.BAD_REQUEST))
            }
            const updatedFriendIds = [...currentFriendIds,IdToAdd ];

            const updateUser = await Users.update({
              friendsIds: updatedFriendIds
            }, {
              where: {
                userId: sessionUser.dataValues.userId
              }
            });
            logger.info(`${sessionUser.dataValues.username} added ${friend.dataValues.username} successfully`);
            return res.status(StatusCodes.OK).json('user succesfully added')
         })

         public searchAllUsers = tryCatch(async(req:Request,res:Response)=>{
          const validationResult = searchSchema.validate(req.query);
          if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
          }
          const {username} = validationResult.value;
      
          const allUsers:any = await Users.findOne({
            where:{
              username:username
            }
          })
         
          if (!allUsers) {
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(`${username} not found`,StatusCodes.BAD_REQUEST))
          }
          const {password,...rest} = allUsers.dataValues
          res.status(StatusCodes.OK).json(rest)
         })

         public deleteUser = tryCatch(async(req:Request,res:Response) => {
          const validationResult = deleteSchema.validate(req.params);
          if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
          }
          const {userId} = validationResult.value;

           const deletedRows = await Users.destroy({
            where: {
              userId: userId,
            },
          });
          if (deletedRows > 0) {
            logger.info(`${userId} deleted succesfully`)
            res.status(StatusCodes.OK).json('user deleted succesfully ')
          } else {
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(`user with this id ${userId} not found`,StatusCodes.BAD_REQUEST))
          }
         })

         public verifyUser = tryCatch(async(req:Request,res:Response) => {
          const userId = req.user.userId
          const verifyUser = Users.update({
              isVerified:true
            },
            {
              where:{
                userId:userId
            }
          })
          if(!verifyUser){
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(`error occured while verifying user ${userId}`,StatusCodes.BAD_REQUEST))
          }
          logger.error('error verifying user')
          return res.status(StatusCodes.OK).json('user verified succesfully')
         })

         public completeProfile = tryCatch(async(req:Request,res:Response) => {
          const userId = req.user.userId
          const validationResult = completeProfile.validate(req.body);
          if (validationResult.error) {
            return res.status(400).json(errorFormatter(validationResult.error.details[0].message,StatusCodes.BAD_REQUEST));
          }
          const {location} = validationResult.value;
          const updateLocation = Users.update({
            location:location
          },{
            where:{
              userId:userId
            }
          })

          logger.info(`${userId} updated successfully`)

          if(!completeProfile){
            logger.error(`error updating ${userId} profile `)
            return res.status(StatusCodes.BAD_REQUEST).json(errorFormatter(`error occured while updating location`,StatusCodes.BAD_REQUEST))
          }

          res.status(StatusCodes.OK).json('updated succesfully')
         })
}

export default new user