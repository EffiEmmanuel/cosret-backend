import mongoose from "mongoose";

const Project = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    engineerAssigned: {
      type: mongoose.Types.ObjectId,
      ref: "Engineer",
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    userRequirements: [
      {
        type: mongoose.Types.ObjectId,
        ref: "UserRequirement",
      },
    ],
    systemRequirements: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SystemRequirement",
      },
    ],
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", Project);
export default ProjectModel;
