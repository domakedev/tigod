/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
import { CHAT_TO, AUTH_USER, MY_VOCATION, MY_U_INTEREST } from "./types";

const initialState = {
  chatTo: {},
  authUser: null,
  // miVocacion: "",
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
    case MY_VOCATION:
      return { ...state, authUser: { ...state.authUser, vocation: newValue } };
    case MY_U_INTEREST:
      return {
        ...state,
        authUser: { 
          ...state.authUser, 
          universityInterestedIn: newValue 
        },
      };

    default:
      return state;
  }
};
export default reducer;
