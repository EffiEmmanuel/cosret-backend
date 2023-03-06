import mongoose from "mongoose";

const Engineer = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    chatRooms: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ChatRoom",
      },
    ],
    projectsAssignedTo: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const EngineerModel = mongoose.model("Engineer", Engineer);
export default EngineerModel;
