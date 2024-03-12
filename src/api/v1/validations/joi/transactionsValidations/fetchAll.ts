import Joi from "joi";

const fetchAll = Joi.object({
    userId:Joi.string().uuid({ version: 'uuidv4' }).required(),
  });

export default fetchAll