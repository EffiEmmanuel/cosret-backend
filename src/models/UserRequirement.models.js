import mongoose from "mongoose";

const UserRequirement = new mongoose.Schema(
  {
    requirement: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    systemRequirements: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SystemRequirement",
      },
    ],
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

const UserRequirementModel = mongoose.model("UserRequirement", UserRequirement);
export default UserRequirementModel;
