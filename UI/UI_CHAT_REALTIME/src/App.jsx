import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import ForgotPass from "./components/ForgotPass/ForgotPass";
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgotpass" element={<ForgotPass />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
