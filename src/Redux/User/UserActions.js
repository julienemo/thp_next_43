import { SET_USER, CLEAR_USER, UPDATE_USER } from "./UserTypes";
import Decoded from "jwt-decode"

export const setUser = (response) => {
  const arg = {
    type: SET_USER,
    ...response,
  }
  console.log(arg)
  return arg;
};

export const clearUser = () => {
  console.log('in action clear user')
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