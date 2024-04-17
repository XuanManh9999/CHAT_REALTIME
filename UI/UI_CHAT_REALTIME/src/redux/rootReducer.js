import { combineReducers } from "redux";
import { userReducer } from "./reducer/userReducer";
import { friendReducer } from "./reducer/friendReducer";
const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  accountLogin: userReducer,
  friend: friendReducer,
});

export default rootReducer;
