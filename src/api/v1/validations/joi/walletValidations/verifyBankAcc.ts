import Joi from "joi"

const verifyBankAcc = Joi.object({
    accNo:Joi.string().required().length(10),
    bankName:Joi.string().required()
  });

export default verifyBankAcc