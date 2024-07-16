import mongoose from "mongoose"

export const applyFilters = async (model, filters) => {
  if (filters.categoryName) {
    const categories = await mongoose
      .model("Category")
      .find({ name: filters.categoryName })
    const categoryIds = categories.map((category) => category._id)
    filters.category = { $in: categoryIds }
    delete filters.categoryName
  }
  return model.find(filters)
}
