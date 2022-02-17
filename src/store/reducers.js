/* eslint-disable no-console */
/* eslint-disable no-case-declarations */
/* eslint-disable default-param-last */
import { CHAT_TO } from "./types";

const initialState = {
  chatTo: "",
};

const reducer = (state = initialState, action) => {
  const newValue = action.payload;

  switch (action.type) {
    case CHAT_TO:
      return { ...state, chatTo: newValue };

    default:
      return state;
  }
};
export default reducer;
