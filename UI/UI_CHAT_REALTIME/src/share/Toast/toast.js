import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const toastMessage = ({ message, position = "bottom-right", state }) => {
  if (state === "error") {
    toast.error(message, {
      position: position,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  } else if (state === "success") {
    toast.success(message, {
      position: position,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  } else if (state === "info") {
    toast.info(message, {
      position: position,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  } else if (state === "warning") {
    toast.warning(message, {
      position: position,
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }
};

export default toastMessage;
// Compare this snippet from UI/UI_CHAT_REALTIME/src/share/index.js:
