import mongoose from "mongoose";

const Message = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      refPath: "modelType",
    },
    modelType: {
      type: String,
      enum: ["User", "Engineer"],
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", Message);
export default MessageModel;
