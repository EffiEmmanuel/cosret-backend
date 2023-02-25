import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", User);
export default UserModel;
