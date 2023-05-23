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
    // stakeholders: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Stakeholder",
    //   },
    // ],
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const ChatRoomModel = mongoose.model("ChatRoom", ChatRoom);
export default ChatRoomModel;
