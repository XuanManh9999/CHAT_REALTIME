import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Signup, ForgotPass } from "./components";

import Homes from "./components/Homes/Home";
import ContactPage from "./components/Contact/Contact";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ContactPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotpass" element={<ForgotPass />} />
            </Routes>
        </Router>
    );
}

export default App;
