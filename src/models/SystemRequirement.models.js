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
