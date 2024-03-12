import Joi from 'joi';

const newWalletSchema = Joi.object({
    userId:Joi.string().uuid({ version: 'uuidv4' }).required(),
  });

export default newWalletSchema