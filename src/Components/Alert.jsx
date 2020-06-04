import React from "react";
import { Alert } from 'antd';

const Alert = ({ message, type }) => { 
  console.log("in Alert");
  
}
import React from "react";
import { Alert } from 'antd';
import { useSelector } from "react-redux";

const Alert = () => { 
  console.log("in alert");
  const alertMessage = useSelector((state) => state.alert.message);
  const alertType = useSelector((state) => state.alert.alertType);

  return (
    alertMessage && <Alert message={alertMessage} type={alertType} />
  )
}

export default Alert;