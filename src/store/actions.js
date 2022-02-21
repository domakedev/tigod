/* eslint-disable import/no-anonymous-default-export */
import { CHAT_TO, AUTH_USER, MY_VOCATION, MY_U_INTEREST } from "./types";

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
const setUserVocation = (vocacion) => ({
  type: MY_VOCATION,
  payload: vocacion,
});
const setUniInteres = (unisArr) => ({
  type: MY_U_INTEREST,
  payload: unisArr,
});

// Chat
const setProToChat = (user) => async (dispatch) => {
  try {
    dispatch(setChatTo(user));
  } catch (e) {
    console.log(e);
  }
};

// User
const saveAuthUser = (user) => async (dispatch) => {
  try {
    dispatch(setAuthUser(user));
  } catch (e) {
    console.log(e);
  }
};
const saveMyVocation = (vocation) => async (dispatch) => {
  try {
    // Guardar en la DB con Apollo
    dispatch(setUserVocation(vocation));
  } catch (e) {
    console.log(e);
  }
};
const saveMyUnisInteres = (uniArr) => async (dispatch) => {
  try {
    // Guardar en la DB con Apollo
    dispatch(setUniInteres(uniArr));
  } catch (e) {
    console.log(e);
  }
};

export default {
  setProToChat,
  saveAuthUser,
  saveMyVocation,
  saveMyUnisInteres,
};
