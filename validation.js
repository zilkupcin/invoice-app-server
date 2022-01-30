const Joi = require("joi");
const User = require("./models/user.model");

// Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Invoice Validation
const invoiceValidation = (data) => {
  const itemSchema = Joi.object({
    name:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    quantity:
      data.status === "draft"
        ? Joi.number().min(0).default(0)
        : Joi.number().min(0).required(),
    price:
      data.status === "draft"
        ? Joi.number().min(0).default(0)
        : Joi.number().min(0).required(),
  }).unknown(true);

  const invoiceSchema = Joi.object({
    streetAddress:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    city:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    postCode:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    country:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    clientName:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    clientEmail:
      data.status === "draft"
        ? Joi.string()
            .email({ tlds: { allow: false } })
            .allow("")
        : Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
    clientStreetAddress:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    clientCity:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    clientPostCode:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    clientCountry:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    date: Joi.date(),
    paymentTerms: Joi.string().valid("net_1", "net_7", "net_14", "net_30"),
    projectDescription:
      data.status === "draft"
        ? Joi.string().max(255).allow("")
        : Joi.string().min(2).required(),
    status: Joi.string().valid("draft", "pending", "paid").required(),
    items: Joi.array().min(1).items(itemSchema),
  }).unknown(true);

  return invoiceSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.invoiceValidation = invoiceValidation;
