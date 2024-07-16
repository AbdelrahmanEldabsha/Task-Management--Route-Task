import * as tc from "./task.controller.js"
import { asyncHandler } from "../../utils/errorHandler.js"
import { isAuth } from "../../middlewares/authentication.js"
import { Router } from "express"

const taskRouter = Router()

taskRouter.post("/addTask", isAuth(), asyncHandler(tc.addTask))
taskRouter.get("/getTasks", isAuth(), asyncHandler(tc.getTasks))
taskRouter.get("/getPublicTasks", isAuth(), asyncHandler(tc.getPublicTasks))
taskRouter.get("/getTaskById", isAuth(), asyncHandler(tc.getTaskById))
taskRouter.put("/updateTask", isAuth(), asyncHandler(tc.updateTask))
taskRouter.delete("/deleteTask", isAuth(), asyncHandler(tc.deleteTask))

export default taskRouter
