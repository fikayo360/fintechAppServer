import Joi from "joi";

const deleteSchema = Joi.object({
    userId:Joi.string().uuid({ version: 'uuidv4' }).required()
  });

export default deleteSchema