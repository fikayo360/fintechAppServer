import Joi from "joi";

const fetchWithDrawals = Joi.object({
    userId:Joi.string().uuid({ version: 'uuidv4' }).required(),
  });

export default fetchWithDrawals