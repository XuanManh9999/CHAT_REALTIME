import "./SignUp.css";
import { Link } from "react-router-dom";
import { InputField } from "../../share";

function Signup() {
  return (
    <div className="box-login">
      <div className="card">
        <div className="card2">
          <form className="form">
            <p id="heading">Đăng ký</p>
            <InputField type="email" placeholder="Email" />
            <InputField type="text" placeholder="Username" />
            <InputField type="password" placeholder="Password" />
            <InputField type="password" placeholder="Confirm Password" />
            <div className="btns">
              <button className="button1s">Đăng ký</button>
              <Link to="/" className="button2s">
                Thoát
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
