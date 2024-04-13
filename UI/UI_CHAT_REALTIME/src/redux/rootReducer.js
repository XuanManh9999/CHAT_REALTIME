import { combineReducers } from "redux";
import { userReducer } from "./reducer/userReducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  accountLogin: userReducer,
});

export default rootReducer;
