import { TYPES_APP } from "./types";
export const ACTIONS_APP = {
  // user
  userLogin: (payload) => ({
    type: TYPES_APP.USER_LOGIN,
    payload,
  }),
  // send message to user
  selectFriend: (payload) => ({
    type: TYPES_APP.SELECT_FRIEND,
    payload,
  }),
};
