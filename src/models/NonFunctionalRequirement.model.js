import mongoose from "mongoose";

const NonFunctionalRequirement = new mongoose.Schema(
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

const NonFunctionalRequirementModel = mongoose.model(
  "NonFunctionalRequirement",
  NonFunctionalRequirement
);
export default NonFunctionalRequirementModel;
