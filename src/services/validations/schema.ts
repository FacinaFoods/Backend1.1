/** @format */

import joi from "joi";

const user = joi.object({
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
  userId: joi.number().required(),
});

const partialClient = joi.object({
  name: joi.string().max(100).optional(),
  cpfCnpj: joi
    .string()
    .pattern(/^\d{11}$|^\d{14}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "The 'cpfCnpj' field must be 11 (CPF) or 14 (CNPJ) digits.",
    }),
  phone: joi
    .string()
    .pattern(/^\d{10,11}$/)
    .optional()
    .messages({
      "string.pattern.base": "The 'phone' field must be 10 or 11 digits.",
    }),
  email: joi.string().email().optional().allow("").messages({
    "string.email": "The 'email' field must be a valid email address.",
  }),
  userId: joi.number().required(),
});

const address = joi.object({
  city: joi.string().required(),
  uf: joi.string().max(2).optional(),
  street: joi.string().required(),
  number: joi.number().integer().required(),
  cep: joi
    .string()
    .pattern(/^\d{5}-\d{3}$/)
    .required(),
  clientId: joi.number().integer().required(),
});

const partialAddress = joi.object({
  city: joi.string().optional(),
  uf: joi.string().max(2).optional(),
  street: joi.string().optional(),
  number: joi.number().integer().optional(),
  cep: joi
    .string()
    .pattern(/^\d{5}-\d{3}$/)
    .optional(),
  clientsId: joi.number().integer().optional(),
});

const product = joi.object({
  category: joi.string().valid("Atacado", "Varejo").required().messages({
    "any.required": "The 'category' field is required.",
    "string.empty": "The 'category' field cannot be empty.",
    "any.only": "The 'category' field must be either 'Atacado' or 'Varejo'.",
  }),

  name: joi.string().required().messages({
    "any.required": "The 'name' field is required.",
    "string.empty": "The 'name' field cannot be empty.",
  }),

  sku: joi.string().allow(null, "").required().messages({
    "string.empty": "The 'sku' field cannot be empty.",
  }),

  ncm: joi.number().integer().allow(null).required().messages({
    "number.base": "The 'ncm' field must be a valid number.",
    "number.integer": "The 'ncm' field must be an integer.",
  }),

  price: joi
    .string()
    .pattern(/^\d+(\,\d{1,2})?$/)
    .required()
    .messages({
      "any.required": "The 'price' field is required.",
      "string.empty": "The 'price' field cannot be empty.",
      "string.pattern.base":
        "The 'price' field must be a valid decimal number with up to 2 decimal places.",
    }),

  cost: joi
    .string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .allow(null, "")
    .required()
    .messages({
      "string.pattern.base":
        "The 'cost' field must be a valid decimal number with up to 2 decimal places.",
    }),

  userId: joi.number().required().messages({
    "any.required": "The 'userId' field is required.",
    "number.base": "The 'userId' field must be a number.",
  }),
});

const partialProduct = joi.object({
  id: joi.number().integer().required(),
  
  category: joi.string().valid("Atacado", "Varejo").optional().messages({
    "string.empty": "The 'category' field cannot be empty.",
    "any.only": "The 'category' field must be either 'Atacado' or 'Varejo'.",
  }),

  name: joi.string().max(100).optional().messages({
    "string.empty": "The 'name' field cannot be empty.",
  }),

  sku: joi.string().allow(null, "").optional().messages({
    "string.empty": "The 'sku' field cannot be empty.",
  }),

  ncm: joi.number().integer().allow(null).optional().messages({
    "number.base": "The 'ncm' field must be a valid number.",
    "number.integer": "The 'ncm' field must be an integer.",
  }),

  price: joi
    .string()
    .pattern(/^\d+(\,\d{1,2})?$/)
    .optional()
    .messages({
      "string.empty": "The 'price' field cannot be empty.",
      "string.pattern.base":
        "The 'price' field must be a valid decimal number with up to 2 decimal places.",
    }),

  cost: joi
    .string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .allow(null, "")
    .optional()
    .messages({
      "string.pattern.base":
        "The 'cost' field must be a valid decimal number with up to 2 decimal places.",
    }),

  userId: joi.number().required().messages({
    "any.required": "The 'userId' field is required.",
    "number.base": "The 'userId' field must be a number.",
  }),
});

const sale = joi.object({
  clientId: joi.number().integer().required(),
  userId: joi.number().integer().required(),
  payment: joi.string().optional(),
  commission: joi.string().optional(),
  saleDate: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    .required()
    .messages({
      "string.pattern.base":
        "The 'saleDate' field must be in the format 'YYYY-MM-DD HH:MM:SS'.",
      "any.required": "The 'saleDate' field is required.",
    }),
  totalValue: joi.string().required(),
  products: joi
    .array()
    .items(
      joi.object({
        productId: joi.number().integer().required(),
        quantity: joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
});

const partialSale = joi.object({
  clientId: joi.number().integer().optional(),
  payment: joi.string().max(20).optional(),
  sellerId: joi.number().integer().optional(),
  commission: joi.string().max(20).optional(),
  saleDate: joi.date().optional(),
  totalValue: joi.string().max(20).optional(),
});

export = {
  user,
  client,
  partialClient,
  address,
  partialAddress,
  product,
  partialProduct,
  sale,
  partialSale,
};
