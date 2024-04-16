import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Signup, ForgotPass } from "./components";

import Homes from "./components/Homes/Home";
import ContactPage from "./components/Contact/Contact";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homes />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotpass" element={<ForgotPass />} />
                <Route path="/profile" element={<ContactPage />} />
            </Routes>
        </Router>
    );
}

export default App;
