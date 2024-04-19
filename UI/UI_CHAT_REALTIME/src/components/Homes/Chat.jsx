import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faPhone,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { selectorFriend, selectorUser } from "../../redux/selector";
import { getDataChat, createChat, updateAccount } from "../../api";
import { toastMessage, Container } from "../../share";
import { Context } from "../ContextApi/Context";

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
  const { setUserOnline } = useContext(Context);
  const navigator = useNavigate();
  const user = useSelector(selectorUser);
  const friend = useSelector(selectorFriend);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [showAccount, setShowAccount] = useState(false);
  const [mainAccount, setMainAccount] = useState(user);

  const hendleMainUser = (e) => {
    const { name, value } = e.target;
    setMainAccount({ ...mainAccount, [name]: value });
  };
  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("join", { ...user, online: 1 });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("user-online", (data) => {
      console.log("user-online-chat", data);
      setUserOnline(data);
    });
  });
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

  const hendleLogOut = async (e) => {
    e.preventDefault();
    const isCheck = confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (isCheck) {
      socket.emit("offline", user);
    }
    navigator("/");
  };

  const hendleUpdateAccount = async () => {
    e.preventDefault();
    const isCheck = confirm("Bạn có chắc chắn muốn cập nhật thông tin không?");
    if (isCheck) {
      const response = await updateAccount(mainAccount);
      console.log(response);
      if (response?.status === 200) {
        // dispatch(ACTIONS_APP.userLogin(response?.data[0]));
        toastMessage({
          message: "Cập nhật thông tin thành công",
          state: "success",
        });
      }
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
                      <small>{friend?.online === 1 ?  "Online": "Offline"}</small>
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
                  onChange={hendleMainUser}
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
                  onChange={hendleMainUser}
                  name="fullName"
                  type="text"
                  value={mainAccount.fullName}
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  onChange={hendleMainUser}
                  name="phonenumber"
                  value={mainAccount.phonenumber ?? ""}
                  type="text"
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>DateOfBirth</label>
                <input
                  onChange={hendleMainUser}
                  name="dateofbirth"
                  value={mainAccount.dateofbirth ?? ""}
                  type="text"
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  onChange={hendleMainUser}
                  name="age"
                  value={mainAccount.age ?? ""}
                  type="text"
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>Avatar</label>
                <input
                  onChange={hendleMainUser}
                  type="text"
                  name="avatar"
                  value={mainAccount.avatar}
                  className="form-controlp"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  onChange={hendleMainUser}
                  name="address"
                  value={mainAccount.address}
                  type="text"
                  className="form-controlp"
                />
              </div>
              <button
                type="submit"
                onClick={hendleUpdateAccount}
                className="btn btn-success"
              >
                Cập nhật thông tin
              </button>
              <button
                type="submit"
                onClick={hendleLogOut}
                className="btn btn-secondary"
              >
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
      <Container />
    </>
  );
}

export default Chat;
