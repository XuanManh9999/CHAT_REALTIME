import { useEffect, useState } from "react";
import { io } from "socket.io-client";
function Index() {
  const [value, setValue] = useState("");
  const socket = io("http://localhost:5000");
  const hendleClick = () => {
    socket.emit("chat message", value);
  };
  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log(msg);
    });
  }, []);
  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Nhập tin nhắn"
      />
      <button onClick={hendleClick}>Submid</button>
    </>
  );
}

export default Index;
