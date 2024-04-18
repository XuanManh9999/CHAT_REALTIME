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
function formatMessageTime(isoDateString) {
  const date = new Date(isoDateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleString("en-US", options);
}

let socket;
function Chat() {
  const user = useSelector(selectorUser);
  const friend = useSelector(selectorFriend);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [showAccount, setShowAccount] = useState(false);

  const [mainAccount, setMainAccount] = useState(user);
  useEffect(() => {
    socket = io("http://localhost:5000", { transports: ["websocket"] });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user?.id && friend?.id) {
      (async () => {
        const response = await getDataChat(user.id, friend.id);
        if (response?.status === 200) {
          setData(response.data);
          setTimeout(() => {
            const messageList = document.querySelector(".list-message-chat");
            messageList.scrollTop = messageList.scrollHeight;
          }, 0);
        }
      })();
    }
  }, [user?.id, friend?.id]);

  useEffect(() => {
    socket.on(`message-${user.id}`, (msg) => {
      setData((prev) => [
        ...prev,
        {
          idUser1: msg.from,
          idUser2: msg.to,
          message: msg.message,
          createAt: new Date(),
        },
      ]);
    });
  }, [user?.id]);
  const hendleSend = async () => {
    if (text) {
      socket.emit(`chat message`, {
        from: user.id,
        to: friend.id,
        message: text,
      });
      setData((prev) => [
        ...prev,
        {
          idUser1: user.id,
          idUser2: friend.id,
          message: text,
          createAt: new Date(),
        },
      ]);
      setTimeout(() => {
        const messageList = document.querySelector(".list-message-chat");
        messageList.scrollTop = messageList.scrollHeight;
      }, 0);
      await createChat({ idUser: user.id, idFriend: friend.id, message: text });
      setText("");
    }
  };

  // enter send message
  const hendleKeyPress = (e) => {
    if (e.key === "Enter") {
      hendleSend();
    }
  };
  const hendleAccount = () => {
    setShowAccount(true);
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
                    <Link className="btn-call">
                      <FontAwesomeIcon icon={faVideo} />
                    </Link>
                    <Link className="btn-call">
                      <FontAwesomeIcon icon={faPhone} />
                    </Link>
                    <Link onClick={hendleAccount} className="btn-call">
                      <FontAwesomeIcon icon={faUser} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="chat-history">
                <ul className="list-message-chat m-b-0 ">
                  {data &&
                    data.length > 0 &&
                    data.map((msg, index) => (
                      <li
                        key={index}
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
                            {formatMessageTime(msg.createAt)}
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
      {showAccount && (
        <div className="overlay">
          <div className="update-form">
            <form>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={mainAccount.email}
                  readOnly
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>fullName</label>
                <input
                  name="fullName"
                  type="text"
                  value={mainAccount.fullName}
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phonenumber"
                  value={mainAccount.phonenumber ?? ""}
                  type="text"
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>DateOfBirth</label>
                <input
                  name="dateofbirth"
                  value={mainAccount.dateofbirth ?? ""} 
                  type="text"
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  name="age"
                  value={mainAccount.age ?? ""}
                  type="text"
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>Avatar</label>
                <input type="text" name="avatar" value={mainAccount.avatar} className="form-controlp" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input name="address" value={mainAccount.address} type="text" className="form-controlp" />
              </div>
              <button type="submit" className="btn btn-success">
                Cập nhật thông tin
              </button>
              <button type="submit" className="btn btn-success">
                Đăng xuất
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowAccount(false)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
