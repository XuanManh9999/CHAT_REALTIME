import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

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
=======
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
>>>>>>> ff966ed6d60841f014ee489c2618755010c6d25e
  );
}

export default App;
