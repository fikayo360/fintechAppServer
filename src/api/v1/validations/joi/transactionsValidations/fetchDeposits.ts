import Joi from "joi";

const fetchDeposits = Joi.object({
    userId:Joi.string().uuid({ version: 'uuidv4' }).required(),
  });

export default fetchDeposits