// @ts-nocheck
import express, { json, urlencoded } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import userRouter from "./routers/userRouter.js";
import engineerRouter from "./routers/engineerRouter.js";
dotenv.config();

// Routers

const app = express();

// Connect to database
connectDB();

// Middewares
app.use(cors());
app.use(urlencoded({ extended: false, limit: "50mb" }));
app.use(json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/engineers", userRouter);

// Creating the server
const server = http.createServer(app);

// Establish connection to socket.io
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//   },
// });

// Listening for io connection event
// io.on("connection", (socket) => {
//   console.log("User Connected:", socket.id);

//   //   Listening for a disconnect event
//   io.on("disconnect", () => {
//     console.log("User Disconnected:", socket.id);
//   });
// });

// Set up server to listen on specified port number
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
