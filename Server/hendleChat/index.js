const hendleChat = (io, publicKey, privateKey, decrypt, encrypt) => {
  let userUseApp = [];
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.emit("publicKey", publicKey);
    socket.on("join", (data) => {
      if (!userUseApp.some((item) => item.id === data.id)) {
        userUseApp.push(data);
        socket.emit("user-online", userUseApp);
        socket.broadcast.emit("user-online", userUseApp);
      }
    });

    socket.on("chat message", (data) => {
      const { from, to, message } = data;
      try {
        const decryptedMessage = decrypt(privateKey, message);
        
        io.emit(`message-${to}`, { from, to, decryptedMessage });
      } catch (error) {
        console.error("Error decrypting message:", error);
      }
    });

    socket.on("offline", (data) => {
      console.log("Client offline", data);
      userUseApp = userUseApp.filter((item) => item.id !== data.id);
      socket.emit("user-online", userUseApp);
      socket.broadcast.emit("user-online", userUseApp);
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default hendleChat;
