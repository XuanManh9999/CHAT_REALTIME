import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Signup, ForgotPass, Fake, NotFound } from "./components";
import { useSelector } from "react-redux";
import { selectorUser } from "./redux/selector";

function App() {
  const data = useSelector(selectorUser);
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        {data?.user && <Route path="/fake" element={<Fake />} />}
      </Routes>
    </Router>
  );
}

export default App;
