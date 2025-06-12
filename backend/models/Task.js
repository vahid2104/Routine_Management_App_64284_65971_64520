import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default mongoose.model("Task", taskSchema);

