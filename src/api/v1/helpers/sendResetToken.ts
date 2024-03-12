// import { number } from 'joi';
import jwt, { Secret } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import logger from '../../../config/logger';

function generateOTP(): string {
  const length = 6;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let OTP = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    OTP += characters.charAt(randomIndex);
  }

  return OTP;
}


 function sendResetToken(email: string) {   
    
    let tokenData = generateOTP()
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    });
  
    let mailOptions = {
      from: process.env.EMAIL as string,
      to: email,
      subject: 'password reset ',
      text: `we sent an otp use it to reset your password: ${tokenData}`,
    };
  
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
          logger.error('Error sending email:', error);
        } else {
          logger.info('Email sent:', info.response)
        }
      });
  
    return tokenData;
  }
  

export default sendResetToken