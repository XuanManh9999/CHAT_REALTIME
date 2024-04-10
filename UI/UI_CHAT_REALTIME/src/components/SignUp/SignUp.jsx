import './SignUp.css'
import { Link } from 'react-router-dom';


function Signup() {
    
    const InputIcon = ({ path }) => (
        <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            className="input-icon">
            <path d={path}></path>
        </svg>
    );

    
    const InputField = ({ type, placeholder }) => (
        <div className="field">
            <InputIcon path="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76v5.206h8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907s8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            <input
                type={type}
                className="input-field"
                placeholder={placeholder}
                autoComplete="off"
            />
        </div>
    );
    return (
        <div className='box-login'>
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
                        <Link to="/" className="button2s">Thoát</Link>
                    </div>
                    
                </form>
            </div>
        </div>
        </div>
    );
}

export default Signup;
