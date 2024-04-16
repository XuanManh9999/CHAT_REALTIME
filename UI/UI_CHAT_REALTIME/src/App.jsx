import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorUser } from "./redux/selector";

import { Login, Signup, ForgotPass, NotFound, Homes } from "./components";

function App() {
  const data = useSelector(selectorUser);
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        {/* data?.user && */}
        {<Route path="/home" element={<Homes />} />}
      </Routes>
    </Router>
  );
}

export default App;
