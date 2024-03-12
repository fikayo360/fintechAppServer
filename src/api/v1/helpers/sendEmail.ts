
import * as nodemailer from 'nodemailer';
import logger from '../../../config/logger';
import { response } from 'express';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
  }

  
  const sendEmailConfirmation = (receiver: string): void => {
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
  
    let mailOptions: MailOptions = {
      from: process.env.EMAIL as string,
      to: receiver,
      subject: 'Welcome',
      text: 'Welcome to finy, the home of free and unfiltered news on the Go',
    };
  
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        logger.error('Error sending email:', error);
      } else {
        logger.info('Email sent:', info.response)
      }
    });
  };

export {sendEmailConfirmation}