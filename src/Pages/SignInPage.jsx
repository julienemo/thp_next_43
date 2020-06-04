import React from "react";
import { useHistory, Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox } from 'antd';

import { setAlertFlash, setUser } from "../Redux";
import { StoreUser } from "../Tools"

const SignInPage = () => {
  console.log("In SignIn page");
  const history = useHistory();
  const dispatch = useDispatch();

  const mandatoryMessage = "This field is mandatory.";

  const onFinish = values => {
    fetch("http://localhost:3000/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: values })
    })
      .then(response => response.json().then(json => ({ 
        token: response.headers.get('Authorization').split(" ")[1],
        ...json,
      })))
      .then(response => { 
        StoreUser(response);
        dispatch(setUser(response));
        dispatch(setAlertFlash(`Hey ${response.first_name}, how are you doing?`))
        history.push("/profile")
      })
      .catch((error) => { 
        console.log(error)
        dispatch(setAlertFlash("Log in error. Please verify your email and password", "error"))
      })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="page">
      <p>Sign In</p>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: mandatoryMessage }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: mandatoryMessage }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
      <p>Not a user yet?<Link to="/sign_up"> Create your account</Link></p>
    </div>
  )
}

export default SignInPage;
