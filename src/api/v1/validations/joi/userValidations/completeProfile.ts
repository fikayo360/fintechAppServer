import Joi from "joi";

const completeProfile = Joi.object({
    location:Joi.string().required()
  });

export default completeProfile