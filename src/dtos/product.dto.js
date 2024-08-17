import Joi from "joi";

export const productDto = Joi.object({
  title: Joi.string().required(),
  photo: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
});