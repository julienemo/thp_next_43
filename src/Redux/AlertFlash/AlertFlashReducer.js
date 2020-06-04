import { SET_ALERT_FLASH, CLEAR_ALERT_FLASH } from "./AlertFlashTypes";

const initial = {
  message: null,
  alertType: null,
};

const AlertFlashReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_ALERT_FLASH:
      return {
        message: action.message,
        alertType: action.alertType,
      };
    case CLEAR_ALERT_FLASH:
      return {
        message: null,
        alertType: null,
      };
    default:
      return state;
  }
};

export default AlertFlashReducer;