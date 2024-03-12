import express from 'express';
import Joi from 'joi';
import errorFormatter from '../helpers/errorFormatter';

const validateRequestBody = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema = Joi.object().pattern(/./, Joi.string().required());
  
    const validationResult = schema.validate(req.body);
  
    if (validationResult.error) {
      return res.status(400).json(errorFormatter('All properties in the request body must be non-empty strings.',400))
    }
  
    next();
  };
  
  export default validateRequestBody