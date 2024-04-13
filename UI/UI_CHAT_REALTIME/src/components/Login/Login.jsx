import "./Login.css";
import { Link } from "react-router-dom";
import { InputField } from "../../share";

function Login() {
    return (
        <div className="box-2">
            <div className="box-loginl">
                <div className="cardl">
                    <div className="card2">
                        <div className="form">
                            <p id="heading">Đăng nhập</p>
                            <InputField type="text" placeholder="username" />
                            <InputField
                                type="password"
                                placeholder="password"
                            />
                            <div className="btnl">
                                <Link to="/home" className="button1l">
                                    Đăng nhập
                                </Link>
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
            </div>
        </div>
    );
}

export default Login;
