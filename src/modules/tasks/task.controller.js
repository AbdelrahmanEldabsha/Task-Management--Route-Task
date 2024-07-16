import { taskModel } from "../../../DB/models/task.model.js"
import { userModel } from "../../../DB/models/user.model.js"
import { categoryModel } from "../../../DB/models/category.model.js"
import { applyFilters } from "../../utils/filtration.js"
import {
  applyPagination,
  formatPaginatedResponse,
} from "../../utils/pagination.js"
import { applySorting } from "../../utils/sorting.js"

export const addTask = async (req, res) => {
  const task = { ...req.body, userId: req.authUser._id }
  const newTask = new taskModel(task)
  await newTask.save()
  res.status(200).json({ message: "task added successfully", newTask })
}
export const getTasks = async (req, res) => {
  const filters = {
    shared: req.query.shared,
    userId: req.authUser._id,
    categoryName: req.query.categoryName,
  }
  console.log("====================================")
  console.log(filters.categoryName)
  console.log("====================================")
  // Remove undefined filters
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 10
  const options = applyPagination(page, limit)
  Object.keys(filters).forEach(
    (key) => filters[key] === undefined && delete filters[key]
  )

  let tasks = new taskModel()
  if (filters.categoryName) {
    const category = await categoryModel.findOne({ name: filters.categoryName })
    filters.categoryId = category._id
    delete filters.categoryName
    tasks = await taskModel
      .find(filters)
      .limit(options.limit)
      .skip(options.skip)
      .populate("categoryId")
  } else if (!filters.categoryName) {
    tasks = await taskModel
      .find(filters)
      .limit(options.limit)
      .skip(options.skip)
      .populate("categoryId")
  }
  const total = await taskModel.countDocuments(tasks)
  const formattedTasks = formatPaginatedResponse(
    tasks,
    total,
    page,
    options.limit
  )
  res.status(200).json(formattedTasks)
}
export const getPublicTasks = async (req, res) => {
  const filters = {
    shared: true,
    userId: req.authUser._id,
    categoryName: req.query.categoryName,
  }
  // Remove undefined filters
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 10
  const options = applyPagination(page, limit)
  Object.keys(filters).forEach(
    (key) => filters[key] === undefined && delete filters[key]
  )

  let tasks = new taskModel()
  if (filters.categoryName) {
    const category = await categoryModel.findOne({ name: filters.categoryName })
    filters.categoryId = category._id
    delete filters.categoryName
    tasks = await taskModel
      .find(filters)
      .limit(options.limit)
      .skip(options.skip)
      .populate("categoryId")
  } else if (!filters.categoryName) {
    tasks = await taskModel
      .find(filters)
      .limit(options.limit)
      .skip(options.skip)
      .populate("categoryId")
  }
  const total = await taskModel.countDocuments(tasks)
  const formattedTasks = formatPaginatedResponse(
    tasks,
    total,
    page,
    options.limit
  )
  res.status(200).json(formattedTasks)
}
export const getTaskById = async (req, res) => {
  if (!req.query.id) {
    res.status(400).json({ message: "id is required" })
    return
  }
  const task = await taskModel.findById(req.query.id)
  if (!task) {
    res.status(400).json({ message: "task not found" })
    return
  }
  res.status(200).json(task)
}

export const updateTask = async (req, res) => {
  const task = { ...req.body }
  if (!req.query.id) {
    res.status(400).json({ message: "id is required" })
    return
  }
  const updatedTask = await taskModel.findByIdAndUpdate(req.query.id, task, {
    new: true,
  })
  res.status(200).json(updatedTask)
}

export const deleteTask = async (req, res) => {
  if (!req.query.id) {
    res.status(400).json({ message: "id is required" })
    return
  }
  const task = await taskModel.findByIdAndDelete(req.query.id)
  if (!task) {
    res.status(400).json({ message: "task not found" })
    return
  }
  res.status(200).json({ message: "task deleted successfully" })
}
