import "./Homes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// Sử dụng NodeRSA như bình thường
import {
  faSearch,
  faCircle,
  faVideo,
  faPhone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const messages = [
  {
    id: 1,
    time: "10:10 AM, Today",
    message: "Hi Aiden, how are you? How is the project coming along?",
    align: "right", // để chỉ định tin nhắn hiển thị bên phải
  },
  {
    id: 2,
    time: "10:10 AM, Today",
    message: "Are we meeting today?",
    align: "left", // để chỉ định tin nhắn hiển thị bên trái
  },
  {
    id: 3,
    time: "10:10 AM, Today",
    message:
      "Project has been already finished and I have results to show you.",
    align: "left", // tin nhắn hiển thị bên trái
  },
];

const contacts = [
  {
    id: 1,
    name: "HTML CSS & JS",
    status: "left 7 mins ago",
    online: false,
    avatar:
      "https://p92.hu/binaries/content/gallery/p92website/technologies/htmlcssjs-overview.png",
  },
  {
    id: 2,
    name: "PHP & LARAVEL",
    status: "online",
    online: true,
    avatar:
      "https://www.site.pt/wp-content/uploads/2022/01/o-que-e-php-845x480.jpg",
  },
  {
    id: 3,
    name: "REACT JS",
    status: "online",
    online: false,
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcBiBI248rgjtRfFgxc8WapC-w7npSGPi6GnV1_VUMww&s",
  },
  {
    id: 4,
    name: "NODE JS",
    status: "left 10 hours ago",
    online: false,
    avatar:
      "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
  },
];
const socket = io("http://localhost:5000");
function Homes() {
  const [message, setMessage] = useState("");
  const [keyPublic, setkeyPublic] = useState(null);

  useEffect(() => {
    socket.on("publicKey", (keyPublic) => {
      setkeyPublic(keyPublic);
    });

    socket.on("message", (encryptedMessage) => {
      const decryptedMessage = keyPublic.decrypt(encryptedMessage);
      console.log("Received message:", decryptedMessage);
    });

    return () => {
      socket.off("publicKey");
      socket.off("message");
    };
  }, [keyPublic]);

  const [showPostForm, setShowPostForm] = useState(false);
  const handlePostClick = () => {
    setShowPostForm(true);
  };

  const hendleChat = () => {
    if (message.trim() !== "" && keyPublic) {
      // Kiểm tra xem keyPublic đã được thiết lập hay chưa
      // Mã hóa tin nhắn trước khi gửi lên server
      var decrypt = new JSEncrypt();
      // mã hóa dữ liệu với khóa công khai
      const res = decrypt.setPublicKey(keyPublic);
      console.log(res);
      const encryptedMessage = decrypt.encrypt(message);
      console.log(encryptedMessage);
      socket.emit("chat message", encryptedMessage);
      setMessage("");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <div id="plist" className="people-list">
                <div className="input-group input-user">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
                <ul className="list-unstyled chat-list mt-2 user-left mb-0">
                  {contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className={`clearfix ${contact.online ? "active" : ""}`}
                    >
                      <img
                        src={contact.avatar}
                        alt="avatar"
                        style={{
                          width: 50,
                          marginRight: 15,
                        }}
                      />
                      <div className="about">
                        <div className="name">{contact.name}</div>
                        <div className="status">
                          <FontAwesomeIcon
                            icon={faCircle}
                            className={
                              contact.online ? "text-success" : "text-secondary"
                            }
                          />{" "}
                          {contact.status}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={handlePostClick} className="btn-creat">
                  <span className="button-inner">Tạo Phòng</span>
                </button>
              </div>
              <div className="chat">
                <div className="chat-header clearfix">
                  <div className="row header-chat">
                    <div className="col-lg-6 avata-chat">
                      <a>
                        <img
                          src="https://www.site.pt/wp-content/uploads/2022/01/o-que-e-php-845x480.jpg"
                          alt="avatar"
                        />
                      </a>
                      <div className="chat-about">
                        <h6 className="m-b-0 name-avatar">PHP & LARAVEL</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                      <div className="update-info">
                        <button className="btn-info">Update Information</button>
                      </div>
                    </div>

                    <div className="col-lg-6 hidden-sm text-right call-display">
                      <a className="btn btn-call">
                        <FontAwesomeIcon icon={faVideo} />
                      </a>
                      <a className="btn btn-call">
                        <FontAwesomeIcon icon={faPhone} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="chat-history">
                  <ul className="m-b-0">
                    {messages.map((msg) => (
                      <li
                        key={msg.id}
                        className={`clearfix ${
                          msg.align === "right" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`message-data ${
                            msg.align === "left" ? "left-align" : ""
                          }`}
                        >
                          <span className="message-data-time">{msg.time}</span>
                          {/* Avatar chỉ hiển thị khi align là right */}
                          {msg.align === "right" && (
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt="avatar"
                            />
                          )}
                        </div>

                        <div
                          className={`message ${
                            msg.align === "right"
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
                <div className="chat-message clearfix">
                  <div className="input-group mb-0 mess-block">
                    <div className="input-group-prepend">
                      <span onClick={hendleChat} className="input-group-text">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control input-mess"
                      placeholder="Enter text here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPostForm && (
        <div className="overlay">
          <div className="update-form">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Images</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" />
              </div>
              <button type="submit" className="btn btn-success">
                Tạo Phòng
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowPostForm(false)}
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

export default Homes;
