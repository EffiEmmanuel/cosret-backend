import mongoose from "mongoose";

const ChatRoom = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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

const ChatRoomModel = mongoose.model("ChatRoom", ChatRoom);
export default ChatRoomModel;
