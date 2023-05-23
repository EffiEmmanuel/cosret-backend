import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StakeholderModel = mongoose.model("Stakeholder", User);
export default StakeholderModel;
