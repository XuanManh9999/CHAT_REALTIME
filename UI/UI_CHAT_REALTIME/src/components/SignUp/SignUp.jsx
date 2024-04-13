import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { InputField } from "../../share";
import { toastMessage, Container } from "../../share";
import { UsePostApi } from "../../hooks";
import { register } from "../../api";

const validateData = ({ email, username, password, confirmPassword }) => {
  const isFalse = false;
  //email regex
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    toastMessage({
      message: "Email không hợp lệ",
      state: "warning",
    });
    return isFalse;
  }
  if (username.length < 6) {
    toastMessage({
      message: "Username phải lớn hơn 6 kí tự",
      state: "warning",
    });
    return isFalse;
  }
  if (password.length < 6) {
    toastMessage({
      message: "Password phải lớn hơn 6 kí tự",
      state: "warning",
    });
    return isFalse;
  }
  if (password !== confirmPassword) {
    toastMessage({
      message: "Password không trùng khớp",
      state: "warning",
    });
    return isFalse;
  }
  return true;
};

function Signup() {
  const [inputData, setInputData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const hendleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const hendleSubmidRegister = async () => {
    const isResult = validateData(inputData);
    if (isResult) {
      const response = await register(inputData);
      if (response?.status === 200) {
        toastMessage({
          message: "Đăng ký thành công",
          state: "success",
        });

        setInputData({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
      } else if (response?.status === 400) {
        toastMessage({
          message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra và thử lại",
          state: "warning",
        });
      } else if (response?.status === 401) {
        toastMessage({
          message: "Email đã tồn tại trong hệ thống. ",
          state: "warning",
        });
      } else if (response?.status === 500) {
        toastMessage({
          message: "Đã có lỗi xảy ra trong hệ thống vui lòng thử lại sau.",
          state: "error",
        });
      }
    }
  };

  return (
    <div className="box-3">
      <div className="box-logins">
      <div className="cards">
        <div className="card2">
          <div className="form">
            <p id="heading">Đăng ký</p>
            <InputField
              value={inputData.email}
              name="email"
              type="email"
              onChange={hendleOnChange}
              placeholder="Email"
            />
            <InputField
              value={inputData.username}
              name="username"
              type="text"
              onChange={hendleOnChange}
              placeholder="Username"
            />
            <InputField
              value={inputData.password}
              name="password"
              type="password"
              onChange={hendleOnChange}
              placeholder="Password"
            />
            <InputField
              value={inputData.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={hendleOnChange}
              placeholder="Confirm Password"
            />
            <div className="btns">
              <button onClick={hendleSubmidRegister} className="button1s">
                Đăng ký
              </button>
              <Link to="/" className="button2s">
                Thoát
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Container />
    </div>
    </div>
  );
}

export default Signup;
