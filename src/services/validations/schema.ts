import joi from "joi";

const seller = joi.object({
  name: joi.string().required(),
  level: joi.string(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
});

const client = joi.object({
  name: joi.string().required().messages({
    "any.required": "The 'name' field is required.",
    "string.empty": "The 'name' field cannot be empty.",
  }),
  cpfCnpj: joi
    .string()
    .pattern(/^\d{11}$|^\d{14}$/)
    .required()
    .messages({
      "any.required": "The 'cpfCnpj' field is required.",
      "string.empty": "The 'cpfCnpj' field cannot be empty.",
      "string.pattern.base":
        "The 'cpfCnpj' field must be 11 (CPF) or 14 (CNPJ) digits.",
    }),
  phone: joi
    .string()
    .pattern(/^\d{10,11}$/)
    .required()
    .messages({
      "any.required": "The 'phone' field is required.",
      "string.empty": "The 'phone' field cannot be empty.",
      "string.pattern.base": "The 'phone' field must be 10 or 11 digits.",
    }),
  email: joi.string().email().allow("").messages({
    "string.email": "The 'email' field must be a valid email address.",
  }),
});

const address = joi.object({
  city: joi.string().required(),
  uf: joi.string().max(2).optional(),
  street: joi.string().required(),
  number: joi.number().integer().required(),
  cep: joi.string().pattern(/^\d{5}-\d{3}$/).required(),
  clientsId: joi.number().integer().required(),
});

const partialAddress = joi.object({
  city: joi.string().optional(),
  uf: joi.string().max(2).optional(),
  street: joi.string().optional(),
  number: joi.number().integer().optional(),
  cep: joi.string().pattern(/^\d{5}-\d{3}$/).optional(),
  clientsId: joi.number().integer().optional(),
});


export = { seller, client, address, partialAddress };
