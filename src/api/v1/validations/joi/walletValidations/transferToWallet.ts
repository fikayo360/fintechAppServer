import Joi from "joi";

const transferWallet = Joi.object({
    amountSent:Joi.number().precision(2).required(),
    receiverId:Joi.string().uuid({ version: 'uuidv4' }).required(),
  });

export default transferWallet