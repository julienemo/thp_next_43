import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Upload, message, Checkbox } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { setAlertFlash, addImage } from "../Redux";

const NewImage = () => {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  //const [imageUrl, setImageUrl] = useState(null)
  const onFinish = (values) => {
    console.log(values)
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
            extension: "png",
            stream: "123123123",
          }
        })
    })
      .then(response => response.json())
      .then(response => { 
        console.log(response);
        if (response.error) {

        } else { 
          dispatch(addImage(response));
        }
      })
      .catch((error) => { 
        console.error(error);
        dispatch(setAlertFlash("An error occurred", "error")) 
      })
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const { imageUrl } = loading;
  return (
    <>
      {false && <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>}

      <p>Upload a photo</p>
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
