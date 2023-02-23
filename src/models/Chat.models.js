import mongoose from "mongoose";

const Chat = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("Chat", Chat);
export default ChatModel;
