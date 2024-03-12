import Joi from "joi"

const searchSchema = Joi.object({
    username: Joi.string().required()
  });

export default searchSchema