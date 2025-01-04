import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "required",
    "string.empty": "required",
  }),
  password: Joi.string().required().min(6).messages({
    "any.required": "required",
    "string.empty": "required",
  }),
});