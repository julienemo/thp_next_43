import React from "react";
import { useSelector } from "react-redux";
import { Alert } from 'antd';

const AlertFlash = () => { 
  const alertMessage = useSelector((state) => state.alert.message);
  const alertType = useSelector((state) => state.alert.alertType);

  return (
    alertMessage && <Alert message={alertMessage} type={alertType} closable/>
  )
}

export default AlertFlash;