import { TYPES_APP } from "../types";
const init = {};

export const friendReducer = (state = init, actions) => {
  switch (actions.type) {
    case TYPES_APP.SELECT_FRIEND:
      return { ...state, friend: actions.payload };
    default:
      return state;
  }
};
