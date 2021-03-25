import React, { useState } from 'react';
import _ from 'lodash';
import { Button, Form, Upload, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addPost } from '../../actions/post';
import { connect } from 'react-redux';
import {uploadFile} from '../../firebase'
const { Item } = Form;
const ButtonAddImage = props => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [caption, setCaption] = useState('');
  const beforeUpload = file => {
    setFileList({ ...fileList, file });
    return false;
  };
  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const onCaptionChange = e => {
    setCaption(e.target.value);
  };
  const onFinish = async () => {
    const data = {
      imageURLs: [...await Promise.all(fileList.map(file => uploadFile(file.originFileObj)))],
      caption: caption,
    };
    props.addPost(data);
  };
  const onFinishFailed = errInfo => {
    console.log(errInfo);
  };

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const onPreviewImage = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewPhoto(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className='ant-upload-text'>Upload</div>
    </div>
  );
  const { visible } = props;
  return (
    <Modal
      visible={visible}
      okText='Post'
      footer={
        <div>
          <Button onClick={props.handleCancelModal}>Cancel</Button>
          <Button type='primary' form='upload-photo-form' htmlType='submit'>
            Post
          </Button>
        </div>
      }
    >
      <div className='add-post'>
        <div className='add-post-controller'>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed} className='form' name='upload-photo-form'>
            <Item label='Hình ảnh' name='img' className='img'>
              <div>
                <Upload
                  listType='picture-card'
                  fileList={fileList}
                  onPreview={onPreviewImage}
                  onChange={handleFileListChange}
                  beforeUpload={beforeUpload}
                >
                  {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                  <img alt='img preview' style={{ width: '100%' }} src={previewPhoto} />
                </Modal>
              </div>
            </Item>
            <Item className='caption'>
              <Input.TextArea onChange={onCaptionChange} value={caption} />
            </Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    addPost: payload => addPost(payload)(dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddImage);
