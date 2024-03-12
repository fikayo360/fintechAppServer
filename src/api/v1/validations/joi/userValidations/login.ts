import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
  });

export default loginSchema