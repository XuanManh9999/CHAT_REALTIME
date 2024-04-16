// hendleChat.js
const hendleChat = (io, key) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Gửi khóa công khai đến client
    socket.emit("publicKey", key.exportKey("public"));

    // Nhận tin nhắn từ client và giải mã
    socket.on("chat message", (encryptedMessage) => {
      try {
        const decryptedMessage = key.decrypt(encryptedMessage, "utf8");
        console.log("Received message:", decryptedMessage);

        // Gửi tin nhắn đã giải mã đến tất cả các client khác
        io.emit("message", decryptedMessage);
      } catch (error) {
        console.error("Error during decryption:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default hendleChat;
