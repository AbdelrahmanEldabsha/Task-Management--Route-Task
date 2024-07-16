import joi from "joi"
import { generalFields } from "../../middlewares/validation.js"
export const signUpSchema = {
  body: joi
    .object({
      name: joi
        .string()
        .min(3)
        .max(55)
        .required()
        .messages({ "any.required": "username is required" }),
      email: generalFields.email,
      password: generalFields.password,
    })
    .required(),
}
export const loginSchema = {
  body: joi
    .object({
      email: generalFields.email,
      password: generalFields.password,
    })
    .options({ presence: "required" })
    .required(),
}
