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
    functionalRequirements: [
      {
        type: mongoose.Types.ObjectId,
        ref: "FunctionalRequirement",
      },
    ],
    nonFunctionalRequirements: [
      {
        type: mongoose.Types.ObjectId,
        ref: "NonFunctionalRequirement",
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
