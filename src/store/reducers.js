/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
import { CHAT_TO, AUTH_USER } from "./types";

const initialState = {
  chatTo: {},
  authUser: {}
};

const reducer = (state = initialState, action) => {
  const newValue = action.payload;

  switch (action.type) {
    // CHAT
    case CHAT_TO:
      return { ...state, chatTo: newValue };
    // USER
    case AUTH_USER:
      return { ...state, authUser: newValue };

    default:
      return state;
  }
};
export default reducer;
