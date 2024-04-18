// hendleChat.js
const hendleChat = (io, key) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (data) => {
      const { from, to, message } = data;
      io.emit(`message-${to}`, { from, to, message });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export default hendleChat;
