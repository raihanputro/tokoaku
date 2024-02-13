const Joi = require("joi");
const Boom = require("boom");

const idValidation = ( data ) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().description('User id; i.e. 1, 2, 3, ...')
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

const userDataValidation = ( data ) => {
    const schema = Joi.object({
        email: Joi.string().required().description('email; i.e. user@mail.com ...'),
        password: Joi.string().min(6).max(20).required().description('Should be between 8-20 characters'),
        username: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        role: Joi.string().required()
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

const itemDataValidation = ( data ) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        authorid: Joi.number().required(),
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

const cartDataValidation = ( data ) => {
    const schema = Joi.object({
        item_id: Joi.number().required(),
        user_id: Joi.number().required(),
        qty: Joi.number().required()
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

module.exports = {
   idValidation,
   userDataValidation,
   itemDataValidation,
   cartDataValidation
  };