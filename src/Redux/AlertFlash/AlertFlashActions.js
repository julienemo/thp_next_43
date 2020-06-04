import { SET_ALERT_FLASH, CLEAR_ALERT_FLASH } from "./AlertFlashTypes";

export const setAlertFlash = (message, alertType) => {
  return {
    type: SET_ALERT_FLASH,
    message,
    alertType,
  };
};

export const clearAlertFlash = () => {
  return {
    type: CLEAR_ALERT_FLASH,
  };
};
