/* eslint-disable import/no-anonymous-default-export */
import { CHAT_TO, AUTH_USER } from "./types";

// Chat
const setChatTo = (email) => ({
  type: CHAT_TO,
  payload: email,
});
// User
const setAuthUser = (user) => ({
  type: AUTH_USER,
  payload: user,
});

// Answer

// Answer loadOnlyPost
const setProToChat = (user) => async (dispatch) => {
  try {
    dispatch(setChatTo(user));
  } catch (e) {
    console.log(e);
  }
};

const saveAuthUser = (user) => async (dispatch) => {
  try {
    dispatch(setAuthUser(user));
  } catch (e) {
    console.log(e);
  }
};

export default {
  setProToChat,
  saveAuthUser,
};
