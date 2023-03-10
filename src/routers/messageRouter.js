import express from "express";
import {
  createMessage,
  getChatRoomMessages,
} from "../controllers/Message.controllers.js";
const messageRouter = express.Router();

messageRouter.post("/", createMessage);
messageRouter.get("/:chatRoomId/get-messages", getChatRoomMessages);

export default messageRouter;
