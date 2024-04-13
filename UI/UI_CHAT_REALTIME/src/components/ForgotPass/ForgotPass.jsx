import { useState } from "react";
import { InputField } from "../../share";
import "./ForgotPass.css";
import { Link } from "react-router-dom";
import { forgotPass } from "../../api";
import { Container, toastMessage } from "../../share";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function ForgotPass() {
<<<<<<< HEAD
    return (
        <div className="box-1">
            <div className="box-loginf">
                <div className="cardf">
                    <div className="card2">
                        <form className="form">
                            <p id="heading">Quên Mật khẩu</p>
                            <InputField type="email" placeholder="Email" />

                            <div className="btn">
                                <button className="button1f">
                                    Lấy lại mật khẩu
                                </button>
                                <Link to="/" className="button2">
                                    Thoát
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
=======
  const [email, setEmail] = useState("");
  const hendleClick = async () => {
    const isEmail = validateEmail(email);
    if (isEmail) {
      const response = await forgotPass({ email });
      if (response?.status === 200) {
        toastMessage({
          state: "success",
          message:
            "Vui lòng kiểm tra email của bạn. Một email đã được gửi đến bạn.",
        });
        setEmail("");
      } else if (response?.status === 400) {
        toastMessage({ state: "warning", message: "Email không hợp lệ" });
      } else if (response?.status === 401) {
        toastMessage({ state: "warning", message: "Email không tồn tại" });
      } else if (response?.status === 500) {
        toastMessage({
          state: "error",
          message: "Đã xảy ra lỗi của hệ thống. Vui lòng thư lại sau",
        });
      }
    } else {
      toastMessage({ state: "warning", message: "Email không hợp lệ" });
    }
  };

  return (
    <div className="box-login">
      <div className="card">
        <div className="card2">
          <div className="form">
            <p id="heading">Quên Mật khẩu</p>
            <InputField
              name={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />

            <div className="btn">
              <button onClick={hendleClick} className="button1f">
                Lấy lại mật khẩu
              </button>
              <Link to="/" className="button2">
                Thoát
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Container />
    </div>
  );
>>>>>>> ff966ed6d60841f014ee489c2618755010c6d25e
}

export default ForgotPass;
