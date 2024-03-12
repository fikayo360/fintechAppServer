
import Joi from "joi";

const forgotPasswordSchema = Joi.object({
    email: Joi.string().required().email(),
  });

export default forgotPasswordSchema