import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Upload, message, Checkbox } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { setAlertFlash, addImage } from "../Redux";

const ChangeImage = (targetImage) => {
  console.log('in change image')
  const imageObject = targetImage.targetImage
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values)
    fetch(`http://localhost:3000/images/${imageObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(
        {
          image: {
            ...values,
          }
        })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.error) {

        } else {
          imageObject.updateFunction(response)
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
        name="ChangeImage"
        className="post-preview"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Description: "
          name="description"
        >
          <Input placeholder="Where did you take it, with whom you took it" />
        </Form.Item>

        <Form.Item name="is_private" valuePropName="checked">
          <Checkbox>Only I shall see this</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangeImage;
