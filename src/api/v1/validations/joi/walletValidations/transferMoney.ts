import Joi from "joi";

const transferMoney = Joi.object({
    amount:Joi.number().precision(2).required(),
    senderId:Joi.string().uuid({ version: 'uuidv4' }).required(),
    receiverAcc:Joi.string().required().length(10),
  });

export default transferMoney