import React, { useState } from 'react';
import _ from 'lodash';
import { Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { recognize } from '../services/recognize';
const { Title } = Typography;
const Recognition = () => {
  const [file, setFile] = useState([]);
  const [base64Image, setBase64Image] = useState('');
  const [recognizedLabel, setRecognizedLabel] = useState(null);
  const [cosineDistance, setCosineDistance] = useState(null);
  const beforeUpload = file => {
    setFile(file);
    return false;
  };
  const handleChange = async ({ file }) => {
    setFile(file);
    const base64Img = await getBase64(file);
    setBase64Image(base64Img);
  };
  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  const handleProcess = () => {
    recognize({ img: base64Image })
      .then(data => {
        setRecognizedLabel(_.get(data, 'recognized.label'));
        setCosineDistance(_.get(data, 'cosineDistance'));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    <div className='character-recognize'>
      <Upload fileList={[]} onChange={handleChange} beforeUpload={beforeUpload} className='upload-image'>
        {base64Image ? (
          <img alt='' src={base64Image} width={150} />
        ) : (
          <div className='choose-image'>
            <UploadOutlined  className='v-center' />
          </div>
        )}
      </Upload>
      <Button className='btn-submit' onClick={handleProcess}>
        {' '}
        Recognize
      </Button>
      <div className='result'>
        {recognizedLabel && <Title level={2}>Chữ cái nhận diện là: <span className="number">{recognizedLabel}</span></Title>}
        {cosineDistance && <Title level={4}>Khoảng cách Cosine: <span className="number">{cosineDistance}</span></Title>}
      </div>
    </div>
  );
};

export default Recognition;
