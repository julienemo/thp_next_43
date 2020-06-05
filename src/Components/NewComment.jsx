import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";

import { setAlertFlash } from "../Redux";

const NewComment = (props) => {
  const image = props.props.id;
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  
  const onFinish = (values) => {
    fetch(`http://localhost:3000/images/${image}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(
        {
          comment: {
            ...values,
            author_id: userId,
            image_id: image,
          }
        })
    })
      .then(response => response.json())
      .then(response => { 
        if (response.error) {
          dispatch(setAlertFlash("An error occurred in the response", "error"))
        } else { 
          props.props.addCommentFunction(response)
        }
      })
      .catch((error) => { 
        console.error(error);
        dispatch(setAlertFlash("An error occurred", "error")) 
      })
  };

  return (
    <>
      <Form
        name="NewComment"
        className="post-preview"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item name="content" >
          <Input placeholder="Comment on this image. Comment!" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Comment
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewComment;
