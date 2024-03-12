import Joi from "joi";

const getNotifications = Joi.object({
    category:Joi.string().required()
  });

export default getNotifications