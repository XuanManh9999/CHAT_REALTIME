import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Signup, ForgotPass } from "./components";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
        </Routes>
      </Router>
  );
}

export default App;
