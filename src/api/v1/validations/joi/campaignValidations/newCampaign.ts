import Joi from "joi";

const newCampaign = Joi.object({
    title:Joi.string().required() ,

    description:Joi.string().required(),

    goal:Joi.required(),
    
    campaignEnds:Joi.date().required()
});

export default newCampaign