import Joi from "joi";

const newContribution = Joi.object({
    campaignId:Joi.string().uuid({ version: 'uuidv4' }).required(),
    amount: Joi.number().precision(2).required(),
  });

export default newContribution