import { TYPES_APP } from "../types";

const initDataUser = {};
export const userReducer = (state = initDataUser, actions) => {
  switch (actions.type) {
    case TYPES_APP.USER_LOGIN:
      return { ...state, user: actions.payload };
    default:
      return state;
  }
};
