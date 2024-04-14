import "./Homes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   
    faVideo,
    faPhone,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";


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



function Chat() {
    return (
        <>
            <div className="">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">                            
                            <div className="chat">
                                <div className="chat-header">
                                    <div className="header-chat">
                                        <div className="avata-chat">
                                            <a>
                                                <img
                                                    src="https://www.site.pt/wp-content/uploads/2022/01/o-que-e-php-845x480.jpg"
                                                    alt="avatar"
                                                />
                                            </a>
                                            <div className="chat-about">
                                                <h6 className="m-b-0 name-avatar">
                                                    PHP & LARAVEL
                                                </h6>
                                                <small>
                                                    Last seen: 2 hours ago
                                                </small>
                                            </div>
                                            <div className="update-info">
                                                <button className="btn-info">
                                                    Update Information
                                                </button>
                                            </div>
                                        </div>

                                        <div className=" hidden-sm text-right call-display">
                                            <a className="btn-call">
                                                <FontAwesomeIcon
                                                    icon={faVideo}
                                                />
                                            </a>
                                            <a className="btn-call">
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                />
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
                                                    msg.align === "right"
                                                        ? "text-right"
                                                        : ""
                                                }`}>
                                                <div
                                                    className={`message-data ${
                                                        msg.align === "left"
                                                            ? "left-align"
                                                            : ""
                                                    }`}>
                                                    <span className="message-data-time">
                                                        {msg.time}
                                                    </span>
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
                                                    }`}>
                                                    {msg.message}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="chat-message clearfix">
                                    <div className=" mb-0 mess-block">
                                        <div className="input-group-prepend">
                                            <span className="">
                                                <FontAwesomeIcon
                                                    icon={faPaperPlane}
                                                />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className=" input-mess"
                                            placeholder="Enter text here..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </>
    );
}

export default Chat;
