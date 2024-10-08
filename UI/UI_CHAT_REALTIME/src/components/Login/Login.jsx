import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../../share";
import { useState } from "react";
import { Container, toastMessage } from "../../share";
import { login } from "../../api";
// redux
import { useDispatch } from "react-redux";

import { ACTIONS_APP } from "../../redux/actions";

const validateData = ({ email, password }) => {
  const isFalse = false;
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    toastMessage({
      message: "Email không hợp lệ",
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
  return true;
};

// call api

function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const hendleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const hendleLogin = async () => {
    const isResult = validateData(inputData);
    if (isResult) {
      const response = await login(inputData);
      if (response !== null) {
        if (response?.status === 200) {
          dispatch(ACTIONS_APP.userLogin(response?.data[0]));
          toastMessage({
            message: "Đăng nhập thành công",
            state: "success",
          });
          setInputData({ email: "", password: "" });
          setTimeout(() => {
            nav("/home");
          }, 500);
        } else if (response?.status === 400) {
          toastMessage({
            message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại",
            state: "warning",
          });
        } else if (response?.status === 401) {
          toastMessage({
            message: "Email không tồn tại trong hệ thống vui lòng kiểm tra lại",
            state: "warning",
          });
        } else if (response?.status === 404) {
          toastMessage({
            message: "Mật khẩu không chính xác. Vui lòng kiểm tra lại",
            state: "warning",
          });
        } else if (response?.status === 500) {
          toastMessage({
            message:
              "Đã xảy ra lỗi bất ngờ từ phía hệ thống. Vui lòng thử lại sau",
            state: "error",
          });
        }
      }
    }
  };

  const hendleEnter = (e) => {
    if (e.key === "Enter") {
      hendleLogin();
    }
  };
  return (
    <div className="box-2">
      <div className="box-login">
        <div className="cardl">
          <div className="card2">
            <div className="form">
              <p id="heading">Đăng nhập</p>
              <InputField
                value={inputData.email}
                name={"email"}
                onChange={hendleChangeInput}
                type="email"
                placeholder="Email"
                hendleEnter={hendleEnter}
              />
              <InputField
                value={inputData.password}
                type="password"
                name={"password"}
                onChange={hendleChangeInput}
                placeholder="password"
                hendleEnter={hendleEnter}
              />
              <div className="btnl">
                <button onClick={hendleLogin} className="button1l">
                  Đăng nhập
                </button>
                <Link to="/signup" className="button2l">
                  Đăng ký
                </Link>
              </div>
              <Link to="/forgotpass" className="button3l">
                Quên mật khẩu
              </Link>
            </div>
          </div>
        </div>
        <Container />
      </div>
    </div>
  );
}

export default Login;
