import Joi from "joi";

const fetchContributions = Joi.object({
    campaignId:Joi.string().uuid({ version: 'uuidv4' }).required()
});

export default fetchContributions