import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import configRoutes from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

configRoutes(app);
const server = app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
const io = new Server(server);
