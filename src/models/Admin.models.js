import mongoose from "mongoose";

const Admin = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("Admin", Admin);
export default AdminModel;
