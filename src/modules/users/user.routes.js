import { Router } from "express"
import * as uc from "./user.controller.js"
import { asyncHandler } from "../../utils/errorHandler.js"
import { validationCoreFunction } from "../../middlewares/validation.js"
import { loginSchema, signUpSchema } from "./user.validation.schema.js"

const userRouter = Router()

userRouter.post(
  "/signUp",
  validationCoreFunction(signUpSchema),
  asyncHandler(uc.signUp)
)

userRouter.get(
  "/login",
  validationCoreFunction(loginSchema),
  asyncHandler(uc.login)
)

export default userRouter
