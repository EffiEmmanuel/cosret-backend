// @ts-nocheck
import express, { json, urlencoded } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import userRouter from "./routers/userRouter.js";
import engineerRouter from "./routers/EngineerRouter.js";
import adminRouter from "./routers/AdminRouter.js";
import projectRouter from "./routers/ProjectRouter.js";
import userRequirementRouter from "./routers/UserRequirementRouter.js";
import systemRequirementRouter from "./routers/functionalRequirementRouter.js";
import messageRouter from "./routers/MessageRouter.js";
import { createMessage } from "./controllers/Message.controllers.js";
import functionalRequirementRouter from "./routers/functionalRequirementRouter.js";
import nonFunctionalRequirementRouter from "./routers/nonFunctionalRequirementRouter.js";
import chatRoomRouter from "./routers/chatRoomRouter.js";

dotenv.config();

const app = express();

// Middewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(urlencoded({ extended: false, limit: "50mb" }));
app.use(json());

// Connect to database
connectDB();

// Routes
app.use("/api/users", userRouter);
app.use("/api/engineers", engineerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/projects", projectRouter);
app.use("/api/user-requirements", userRequirementRouter);
app.use("/api/functional-requirements", functionalRequirementRouter);
app.use("/api/non-functional-requirements", nonFunctionalRequirementRouter);
app.use("/api/messages", messageRouter);
app.use("/api/chatrooms", chatRoomRouter);

// Creating the server
const server = http.createServer(app);

// Establish connection to socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    // origin: ["http://localhost:3000", "https://cosret-frontend.vercel.app"],
    // origin: [
    //   "https://cosret-frontend.vercel.app",
    //   "https://cosret-frontend-effiemmanuel.vercel.app",
    //   "https://cosret-frontend-git-main-effiemmanuel.vercel.app",
    // ],
  },
});

let activeUsers = [];

// Listening for io connection event
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("add-new-user", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    io.emit("get-active-users", activeUsers);
  });

  //   Listening for when a user joins a chat room
  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`User with ID:${socket.id} joined room: ${data}`);
  });

  socket.on("send-message", async (data) => {
    console.log("MESSAGE:", data);
    const req = {
      body: {
        text: data.text,
      },
      query: {
        chatRoomId: data.chatRoom,
        sender: data.sender,
        modelType: data.modelType,
      },
    };
    createMessage(req, {})
      .then((res) => {
        console.log("RES:", res);
        socket.to(data.chatRoom).emit("receive-message", res);
      })
      .catch((err) => {
        console.log("ERR:", err);
      });
  });

  //   Listening for a disconnect event
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-active-users", activeUsers);
  });
});

// Set up server to listen on specified port number
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
