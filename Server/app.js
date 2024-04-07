import express from "express";
import "dotenv/config";
const app = express();
import { Server } from "socket.io";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
const io = new Server(server);
