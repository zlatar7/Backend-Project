import Joi from "joi";

export const cartDto = Joi.object({
  user_id: Joi.string().required(),
  product_id: Joi.string().required(),
  quantity: Joi.number().required(),
  stock: Joi.number()
});