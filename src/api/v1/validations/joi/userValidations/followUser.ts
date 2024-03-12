import Joi from "joi";

const followUser = Joi.object({
     friendName:Joi.string().required()
  });

export default followUser