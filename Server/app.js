import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import configRoutes from "./routes/index.js";
import hendleChat from "./hendleChat/index.js";
import { publicKey, privateKey, decrypt } from "./hendleRSA/index.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.URL_CHAT,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

configRoutes(app);
const server = app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
const io = new Server(server, {
  cors: {
    origin: process.env.URL_CHAT,
  },
  connectionStateRecovery: {
    // the backup duration of the sessions and the packets
    maxDisconnectionDuration: 2 * 60 * 1000,
    // whether to skip middlewares upon successful recovery
    skipMiddlewares: true,
  },
});

hendleChat(io, publicKey, privateKey, decrypt);

/**
 * Khi bị ngắt kết nối không mong muốn (tức là không ngắt kết nối thủ công bằng socket.disconnect()), 
 * máy chủ sẽ lưu trữ id, các phòng và datathuộc tính của ổ cắm.

Sau đó, khi kết nối lại, máy chủ sẽ cố gắng khôi phục trạng thái của máy khách. 
Thuộc recoveredtính cho biết quá trình khôi phục này có thành công hay không:
 */
