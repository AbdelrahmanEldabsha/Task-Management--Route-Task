import { categoryModel } from "../../../DB/models/category.model.js"
import { taskModel } from "../../../DB/models/task.model.js"
import { userModel } from "../../../DB/models/user.model.js"

export const addCategory = async (req, res, next) => {
  const { _id } = req.authUser
  const { name } = req.body
  const isUserExist = await userModel.findById({
    _id,
  })
  if (!isUserExist) {
    return new Error("please sign up first", { cause: 400 })
  }
  const newCategory = new categoryModel({ name, userId: _id })
  await newCategory.save()
  res.status(200).json({ message: "category added successfully", newCategory })
}
export const updateCategory = async (req, res, next) => {
  const { _id } = req.authUser
  const { categoryId } = req.query
  const { name } = req.body
  const isUserExist = await userModel.findById({ _id })
  const isCategoryExist = await categoryModel.findById({ _id: categoryId })
  if (!isUserExist) {
    return next(new Error("please sign up first", { cause: 400 }))
  }
  if (!isCategoryExist) {
    return next(new Error("category not found", { cause: 400 }))
  }
  if (isCategoryExist.userId.toString() != _id.toString()) {
    return next(
      new Error("you are not allowed to update this category", {
        cause: 400,
      })
    )
  }
  isCategoryExist.name = name
  await isCategoryExist.save()
  res
    .status(200)
    .json({ message: "category updated successfully", isCategoryExist })
}
export const getAllUserCategories = async (req, res, next) => {
  const { _id } = req.authUser
  const isUserExist = await userModel.findById({ _id })
  if (!isUserExist) {
    return next(new Error("please sign up first", { cause: 400 }))
  }
  const userCategories = await categoryModel.find({ userId: _id })
  if (!userCategories.length) {
    return next(new Error("no categories found", { cause: 400 }))
  }
  res.status(200).json({ message: " success", userCategories })
}
export const getCategoryById = async (req, res, next) => {
  const { _id } = req.authUser
  const { categoryId } = req.query
  const isUserExist = await userModel.findById({ _id })
  const isCategoryExist = await categoryModel.findById({ _id: categoryId })
  if (!isUserExist) {
    return next(new Error("please sign up first", { cause: 400 }))
  }
  if (!isCategoryExist) {
    return next(new Error("category not found", { cause: 400 }))
  }
  if (isCategoryExist.userId.toString() != _id.toString()) {
    return next(
      new Error("you are not allowed to get this category", { cause: 400 })
    )
  }
  res.status(200).json({ message: " success", isCategoryExist })
}
export const deleteCategory = async (req, res, next) => {
  const { _id } = req.authUser
  const { categoryId } = req.query
  const isUserExist = await userModel.findById({ _id })
  const isCategoryExist = await categoryModel.findById({ _id: categoryId })
  if (!isUserExist) {
    return next(new Error("please sign up first", { cause: 400 }))
  }
  if (!isCategoryExist) {
    return next(new Error("category not found", { cause: 400 }))
  }
  if (isCategoryExist.userId.toString() != _id.toString()) {
    return next(
      new Error("you are not allowed to delete this category", {
        cause: 400,
      })
    )
  }
  //delete related tasks
  await taskModel.deleteMany({ categoryId: categoryId })
  const deletedCategory = await categoryModel.deleteOne({ _id: categoryId })
  if (deletedCategory.deletedCount === 0) {
    return next(new Error("failed to delete category", { cause: 400 }))
  }
  res.status(200).json({
    message: "category deleted successfully with related tasks",
    deletedCategory,
  })
}
