import { SET_USER, CLEAR_USER, UPDATE_USER } from "./UserTypes";

export const setUser = (response) => {
  return {
    type: SET_USER,
    ...response,
  }
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    ...user
  };
};
