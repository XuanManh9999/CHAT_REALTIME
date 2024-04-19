const hendleChat = (io, key) => {
  let userUseApp = [];

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", (data) => {
      if (!userUseApp.some((item) => item.id === data.id)) {
        userUseApp.push(data);
        socket.emit("user-online", userUseApp);
        socket.broadcast.emit("user-online", userUseApp);
      }
    });

    socket.on("chat message", (data) => {
      const { from, to, message } = data;
      io.emit(`message-${to}`, { from, to, message });
    });

    socket.on("offline", (data) => {
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
