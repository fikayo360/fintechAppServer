import Joi from "joi";
import { number } from 'joi';

const newTransactionSchema = Joi.object({
      transactionType:Joi.string().required(),
      amountSent:Joi.number().precision(2).required(),
  });

export default newTransactionSchema