/* eslint-disable import/no-anonymous-default-export */
import { CHAT_TO } from "./types";

const setChatTo = (email) => ({
  type: CHAT_TO,
  payload: email,
});

// Answer

// Answer loadOnlyPost
const setProToChat = (email) => async (dispatch) => {
  try {
    dispatch(setChatTo(email));
  } catch (e) {
    console.log(e);
  }
};

export default {
  setProToChat,
};
