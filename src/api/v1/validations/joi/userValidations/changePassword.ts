import Joi from "joi";

const changePasswordSchema = Joi.object({
    token: Joi.string().required().max(6),
    email: Joi.string().required().email(),
    newPassword: Joi.string().required().min(4)
  });

export default changePasswordSchema