import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { setAlertFlash, clearAlertFlash } from "../Redux";


const SignUpPage = () => {
  console.log("In SignUp page");

  const history = useHistory();
  const dispatch = useDispatch();

  const mandatoryMessage = "This field is mandatory.";

  const onFinish = values => {
    if (values.username.match(/\s/g)) {
      dispatch(setAlertFlash("Username can not contain white space", "error"))
      return
    }
    if (values.password !== values['password-confirm']) { 
      dispatch(setAlertFlash("Password doesn't match confirmation", "error"))
      return
    }
    console.log('Success:', values);
    fetch("http://localhost:3000/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: values })
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          const errorKey = Object.keys(response.details)[0];
          const errorContent = response.details[errorKey];
          const readableError = `${errorKey} ${errorContent}`;
          dispatch(setAlertFlash(readableError, "error"))
        } else { 
          dispatch(setAlertFlash("You just created an account! Now log in with it", "success"))
          history.push("/sign_in")
        }
      })
      .catch((error) => {
        dispatch(setAlertFlash("An error occurred", "error"))
        console.log(error)
      })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="page">
      <p>This this the SignUp page</p>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: mandatoryMessage,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
              message: mandatoryMessage,
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
              message: mandatoryMessage,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: mandatoryMessage,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: mandatoryMessage,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm your password"
          name="password-confirm"
          rules={[
            {
              required: true,
              message: mandatoryMessage,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>Already have an account? <Link to="/sign_in">Sign In</Link>!</p>
    </div>
  )
}

export default SignUpPage;