import { InputField } from "../../share";
import "./ForgotPass.css";
import { Link } from "react-router-dom";

function ForgotPass() {
  return (
    <div className="box-login">
      <div className="card">
        <div className="card2">
          <form className="form">
            <p id="heading">Quên Mật khẩu</p>
            <InputField type="email" placeholder="Email" />

            <div className="btn">
              <button className="button1f">Lấy lại mật khẩu</button>
              <Link to="/" className="button2">
                Thoát
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
