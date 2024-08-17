import Joi from "joi";

export const sessionDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});