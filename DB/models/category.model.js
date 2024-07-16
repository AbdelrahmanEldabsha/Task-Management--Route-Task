import mongoose, { Schema } from "mongoose"

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const categoryModel = mongoose.model("Category", categorySchema)
