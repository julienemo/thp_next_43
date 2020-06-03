import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";


const SignUpPage = () => {
  console.log("In SignUp page");

  const [error, setError] = useState(null);
  const history = useHistory();
  // const dispatch = useDispatch();

  const mandatoryMessage = "This field is mandatory.";

  const onFinish = values => {
    if (values.username.match(/\s/g)) {
      setError("Username can not contain white space")
      return
    }
    if (values.password !== values['password-confirm']) { 
      setError("Password doesn't match confirmation")
      return
    }
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="page">
      <p>This this the SignUp page</p>
      {error && <p className="error_message">{error}</p>}
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