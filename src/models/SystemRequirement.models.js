import mongoose from "mongoose";

const SystemRequirement = new mongoose.Schema(
  {
    requirement: {
      type: String,
      required: true,
    },
    engineer: {
      type: mongoose.Types.ObjectId,
      ref: "Engineer",
    },
    userRequirement: {
      type: mongoose.Types.ObjectId,
      ref: "UserRequirement",
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

const SystemRequirementModel = mongoose.model(
  "SystemRequirement",
  SystemRequirement
);
export default SystemRequirementModel;
