import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faPhone,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectorFriend, selectorUser } from "../../redux/selector";
import { getDataChat, createChat } from "../../api";

let socket;
function Chat() {
  const user = useSelector(selectorUser);
  const friend = useSelector(selectorFriend);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:5000");
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user?.id && friend?.id) {
      (async () => {
        console.log(user.id, friend.id);
        const response = await getDataChat(user.id, friend.id);
        if (response?.status === 200) {
          setData(response.data);
        }
      })();
    }
  }, [user?.id, friend?.id]);

  useEffect(() => {
    socket.on(`message-${user.id}`, async (msg) => {
      const { to, message } = msg;
      console.log(msg);
      await createChat({ idUser: to, idFriend: user.id, message });
      setData([
        ...data,
        {
          idUser1: from,
          message,
          createAt: new Date().toLocaleString(),
        },
      ]);
    });
  }, [user?.id]);
  const hendleSend = async () => {
    if (text) {
      await createChat({ idUser: user.id, idFriend: friend.id, message: text });
      socket.emit(`chat message`, {
        from: user.id,
        to: friend.id,
        message: text,
      });
      setData([
        ...data,
        {
          idUser1: user.id,
          message: text,
          createAt: new Date().toLocaleString(),
        },
      ]);
      setText("");
    }
  };

  // enter send message
  const hendleKeyPress = (e) => {
    if (e.key === "Enter") {
      hendleSend();
    }
  };
  return (
    <>
      {user?.id && friend?.id && (
        <div className="col-lg-9">
          <div className="card chat-app">
            <div className="chat">
              <div className="chat-header">
                <div className="header-chat">
                  <div className="avata-chat">
                    <Link to="/contact">
                      <img
                        src={
                          friend?.avatar
                            ? friend.avatar
                            : "https://i.ibb.co/RYxD4P7/avatar-trang-4.jpg"
                        }
                        alt="avatar"
                      />
                    </Link>
                    <div className="chat-about">
                      <Link to="/contact">
                        <h6 className="m-b-0 name-avatar">
                          {friend?.fullName ? friend.fullName : "Undefine"}
                        </h6>
                      </Link>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>

                  <div className=" hidden-sm text-right call-display">
                    <a className="btn-call">
                      <FontAwesomeIcon icon={faVideo} />
                    </a>
                    <a className="btn-call">
                      <FontAwesomeIcon icon={faPhone} />
                    </a>
                    <a className="btn-call">
                      <FontAwesomeIcon icon={faUser} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="list-message-chat m-b-0 ">
                  {data &&
                    data.length > 0 &&
                    data.map((msg) => (
                      <li
                        key={msg.idUser1}
                        className={`clearfix ${
                          msg.idUser1 === user?.id ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`message-data ${
                            msg.idUser1 !== user?.id ? "left-align" : ""
                          }`}
                        >
                          <span className="message-data-time">
                            {msg.createAt}
                          </span>
                          {/* Avatar chỉ hiển thị khi align là right */}
                          {msg.idUser1 === user?.id && (
                            <img
                              src={
                                user?.avatar
                                  ? user.avatar
                                  : "https://i.ibb.co/RYxD4P7/avatar-trang-4.jpg"
                              }
                              alt="avatar"
                            />
                          )}
                        </div>

                        <div
                          className={`message ${
                            msg.idUser1 === user?.id
                              ? "other-message float-right"
                              : "my-message"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="chat-message ">
                <div className="message-main mb-0 mess-block d-flex gap-1">
                  <input
                    type="text"
                    className="input-mess form-control flex-grow-1"
                    placeholder="Enter text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={hendleKeyPress}
                  />
                  <div className="input-group-prepend">
                    <span onClick={hendleSend} className="">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
