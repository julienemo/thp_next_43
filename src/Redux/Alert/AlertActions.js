import { SET_ALERT, CLEAR_ALERT } from "./AlertTypes";

export const setAlert = (message, alertType) => {
  return {
    type: SET_ALERT,
    message,
    alertType,
  };
};

export const clearAlert = () => {
  return {
    type: CLEAR_ALERT,
  };
};
