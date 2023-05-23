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
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
    },
    engineerAssigned: {
      type: mongoose.Types.ObjectId,
      ref: "Engineer",
    },
    chatRoom: {
      type: mongoose.Types.ObjectId,
      ref: "ChatRoom",
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
    stakeholders: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", Project);
export default ProjectModel;
