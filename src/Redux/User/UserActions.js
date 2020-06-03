import { SET_USER, CLEAR_USER, UPDATE_USER } from "./UserTypes";

export const setUser = (token, username, id) => {
  return {
    type: SET_USER,
    token,
    username,
    id,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const updateUser = (username) => {
  return {
    type: UPDATE_USER,
    username,
  };
};