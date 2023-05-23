import express from "express";
import {
  getChatRooms,
  getMessages,
} from "../controllers/ChatRoom.controllers.js";
const chatRoomRouter = express.Router();

chatRoomRouter.post("/", getChatRooms);
chatRoomRouter.get("/:chatRoomId/get-messages", getMessages);

export default chatRoomRouter;
