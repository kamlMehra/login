import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  Task: {
    type: String,
    required: true,
    unique: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Status: {
    type: Boolean,
    default: false,
  },
  Date: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
