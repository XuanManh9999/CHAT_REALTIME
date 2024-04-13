import { useSelector } from "react-redux";
import { selectorUser } from "../../redux/selector";
function Fake() {
  const data = useSelector(selectorUser);
  return <div>Fake</div>;
}

export default Fake;
