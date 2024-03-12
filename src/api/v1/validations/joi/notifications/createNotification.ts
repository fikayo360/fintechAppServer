import Joi from "joi";

const newNotification = Joi.object({
    message:Joi.string().required(),
    category:Joi.string().required()
  });

export default newNotification