import React from "react";
import { Alert } from 'antd';
import { useSelector } from "react-redux";

const AlertFlash = () => { 
  console.log("in AlertFlash");
  const alertMessage = useSelector((state) => state.alert.message);
  const alertType = useSelector((state) => state.alert.alertType);

  return (
    alertMessage && <Alert message={alertMessage} type={alertType} closable/>
  )
}

export default AlertFlash;