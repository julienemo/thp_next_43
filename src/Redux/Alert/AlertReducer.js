import { SET_ALERT, CLEAR_ALERT } from "./AlertTypes";

const initial = {
  message: null,
  alertType: null,
};

const AlertReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        message: action.message,
        alertType: action.alertType,
      };
    case CLEAR_ALERT:
      return {
        message: null,
        alertType: null,
      };
    default:
      return state;
  }
};

export default AlertReducer;