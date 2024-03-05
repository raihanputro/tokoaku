const Joi = require("joi");
const Boom = require("boom");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi
      .string()
      .required()
      .email()
      .description("Active email"),
    username: Joi
      .string()
      .required()
      .description("Person's username"),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .description("Should be between 6-20 characters"),
    role: Joi
      .string()
      .required()
      .description("User role")
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi
      .string()
      .required()
      .description("Active email"),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .description("Should be between 6-20 characters")
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const idValidation = ( data ) => {
  const schema = Joi.object({
    id: Joi
      .number()
      .required()
      .description('User id; i.e. 1, 2, 3, ...')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const itemDataValidation = ( data ) => {
    const schema = Joi.object({
        category_id: Joi.number().required(),
        name: Joi.string().required(),
        desc: Joi.string().required(),
        price: Joi.number().required(),
        discount: Joi.number().required(),
        stock: Joi.number().required(),
        user: Joi.object().required()
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

const searchItemValidation = ( data ) => {
  const schema = Joi.object({
    name: Joi.string(),
    category_id: Joi.string(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const categoryDataValidation = ( data ) => {
  const schema = Joi.object({
      name: Joi.string().required(),
      user: Joi.object().required()
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

const transactionDataValidation = ( data ) => {
  const schema = Joi.object({
      user_id: Joi.string().required(),
      fullName: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
      province: Joi.string().required(),
      city: Joi.string().required(),
      service: Joi.string().required(),
      shippingCost: Joi.number().required(),
      subTotal: Joi.number().required(),
      total: Joi.number().required(),
      status: Joi.string().required(),
      orderAt: Joi.string().required(),
      expiryAt: Joi.string().required()
    });
  
    if (schema.validate(data).error) {
      throw Boom.badRequest(schema.validate(data).error);
    }
};

const changePasswordValidation = ( data ) => {
  const schema = Joi.object({
      oldPassword: Joi
        .string()
        .required()
        .min(6)
        .max(20)
        .required()
        .description("Should be between 6-20 characters"),
      newPassword: Joi
        .string()
        .required()
        .min(6)
        .max(20)
        .required()
        .description("Should be between 6-20 characters"),
      user_id: Joi
        .number()
        .required(),
    })
    if (schema.validate(data).error) {
      throw Boom.badRequest(schema.validate(data).error);
    }
};


module.exports = {
  registerValidation,
  loginValidation,
  idValidation,
  searchItemValidation,
  itemDataValidation,
  categoryDataValidation,
  cartDataValidation,
  transactionDataValidation,
  changePasswordValidation
};