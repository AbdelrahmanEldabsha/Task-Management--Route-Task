import * as cc from "./category.controller.js"
import { asyncHandler } from "../../utils/errorHandler.js"
import { isAuth } from "../../middlewares/authentication.js"
import { Router } from "express"

const categoryRouter = Router()

categoryRouter.post("/addCategory", isAuth(), asyncHandler(cc.addCategory))
categoryRouter.put("/updateCategory", isAuth(), asyncHandler(cc.updateCategory))
categoryRouter.get(
  "/getUserCategories",
  isAuth(),
  asyncHandler(cc.getAllUserCategories)
)
categoryRouter.get("/getCategoryById", isAuth(), asyncHandler(cc.getCategoryById))
categoryRouter.delete(
  "/deleteCategory",
  isAuth(),
  asyncHandler(cc.deleteCategory)
)
export default categoryRouter
