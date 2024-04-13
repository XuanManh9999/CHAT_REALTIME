import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login, Signup, ForgotPass} from "./components";
import Homes from "./components/Homes/Homes";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/home" element={<Homes />} />
        </Routes>
      </Router>
  );
}

export default App;
