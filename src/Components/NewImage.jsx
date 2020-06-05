import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Checkbox, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { setAlertFlash, addImage } from "../Redux";

const NewImage = () => {
  const [file, setFile] = useState(null);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    fetch("http://localhost:3000/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(
        {
          image: {
            ...values,
            ...file,
          }
        })
    })
      .then(response => response.json())
      .then(response => { 
        if (response.error) {
          dispatch(setAlertFlash("An error occurred in the response", "error"))
        } else { 
          dispatch(addImage(response));
        }
      })
      .catch((error) => { 
        console.error(error);
        dispatch(setAlertFlash("An error occurred", "error")) 
      })
  };

  const uploadProps = {
    name: 'file',
    accept: ".png, .jpg, .jpeg, .gif, .svg, .bmp, .orf",
    beforeUpload: (file) => {
      const extension = file.name.split(".")[1]
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const stream = e.target.result
        setFile({extension, stream})
      };
      reader.onerror = (error) => {
        dispatch(setAlertFlash("Can not read image", "error"))
        console.error(error);
      };
      return false;
    },
  };

  return (
    <>
      <p>Upload an image</p>
      <Upload {...uploadProps}>
        <Button>
          <UploadOutlined /> choose your image
        </Button>
      </Upload>

      <Form
        name="NewImage"
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
            Share
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewImage;
