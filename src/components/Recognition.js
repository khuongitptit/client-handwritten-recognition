import React, { useState } from 'react';
import _ from 'lodash';
import { Upload, Button, Typography, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { recognize } from '../services/recognize';
const { Title } = Typography;
const Recognition = () => {
  const [cv] = useState(window.cv);
  const [file, setFile] = useState(null);
  const [recognizedLabel, setRecognizedLabel] = useState(null);
  const [cosineDistance, setCosineDistance] = useState(null);

  const transformImg = file => {
    const imgElement = document.getElementById('origin');
    imgElement.src = URL.createObjectURL(file);
    imgElement.onload = () => {
      //show binarized image==================================================================
      let src = cv.imread('origin');
      let dst = new cv.Mat();
      cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0); //convert to rgb color
      cv.adaptiveThreshold(src, dst, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 15, 2);// convert to black-white
      cv.imshow('binarized', dst);
      src.delete();
      dst.delete();
      //show noise-reduction image=============================================================
      let src2 = cv.imread('binarized');
      let dst2 = new cv.Mat();
      let ksize = new cv.Size(1, 1);
      cv.GaussianBlur(src2, dst2, ksize, 0, 0, cv.BORDER_DEFAULT); 
      cv.imshow('noise-reduction', dst2);
      src2.delete();
      dst2.delete();
      //show ROI extraction image=============================================================
      let src3 = cv.imread('noise-reduction');
      cv.cvtColor(src3, src3, cv.COLOR_RGBA2GRAY, 0); //convert to rbg color
      // cv.threshold(src3, src3, 170, 255, cv.THRESH_BINARY);
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(src3, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
      let points = []; //get coordinates of contour
      for (let i = 0; i < contours.size(); i++) {
        const ci = contours.get(i);
        points[i] = [];
        for (let j = 0; j < ci.data32S.length; j += 2) {
          let p = {};
          p.x = ci.data32S[j];
          p.y = ci.data32S[j + 1];
          points[i].push(p);
        }
      }
      _.remove(points, (item, index) => index === 0); //remove first element, which is the rectangle frame
      const contourData = _.flatten(points); //find coordinates of top-left and bottom-right corners
      const minX = _.minBy(contourData, coord => coord.x);
      const maxX = _.maxBy(contourData, coord => coord.x);
      const minY = _.minBy(contourData, coord => coord.y);
      const maxY = _.maxBy(contourData, coord => coord.y);
      const topLeft = { x: minX.x, y: minY.y };
      const bottomRight = { x: maxX.x, y: maxY.y };
      let dst3 = src3.roi(new cv.Rect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y)); //crop image
      cv.imshow('roi-extracted', dst3);
      src3.delete();
      dst3.delete();
      contours.delete();
      hierarchy.delete();
      //show resized output image============================================================================
      let src4 = cv.imread('roi-extracted');
      let dst4 = new cv.Mat();
      let dsize = new cv.Size(64, 64);
      cv.resize(src4, dst4, dsize, 0, 0, cv.INTER_AREA); 
      cv.imshow('output', dst4);
      src4.delete();
      dst4.delete();
    };
  };
  const handleChange = async ({ file }) => {
    setFile(file);
    setTimeout(() => {
      transformImg(file);
    }, 1000);
  };
  const _getLabel = (_character, _case) => {
    if(_case === 'upper') {
      return _.toUpper(_character);
    }
    if(_case === 'lower') {
      return _.toLower(_character);
    }
    return _.toLower(_character) + " hoặc " + _.toUpper(_character);
  }
  const handleProcess = () => {
    const outputImg = document.getElementById('output');
    const data = outputImg.toDataURL();
    recognize({ img: data })
      .then(data => {
        const rawLabel = _.get(data, 'recognized.label');
        const _character = _.split(rawLabel, '_')[0];
        const _case = _.split(rawLabel, '_')[1];
        const label = _getLabel(_character, _case);
        setRecognizedLabel(label);
        setCosineDistance(_.get(data, 'cosineDistance'));
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  return (
    <div className='character-recognize'>
      <Title level={4}>Chọn ảnh</Title>
      <Upload fileList={[]} onChange={handleChange} beforeUpload={() => false} className='upload-image'>
        {file ? (
          <img id='origin' alt='' src={URL.createObjectURL(file)} style={{ maxWidth: '300px' }} />
        ) : (
          <div className='choose-image'>
            <UploadOutlined className='v-center' />
          </div>
        )}
      </Upload>
      <Row style={{ height: '400px', textAlign: 'center', marginTop: '10px' }}>
        <Col span={6}>
          <canvas id='binarized' />
          <Title level={4}>Ảnh nhị phân</Title>
        </Col>
        <Col span={6}>
          <canvas id='noise-reduction' />
          <Title level={4}>Ảnh sau giảm nhiễu</Title>
        </Col>
        <Col span={6}>
          <canvas id='roi-extracted'></canvas>
          <Title level={4}>Ảnh trích xuất ROI</Title>
        </Col>
        <Col span={6}>
          <canvas id='output'></canvas>
          <Title level={4}>Ảnh đầu ra</Title>
        </Col>
      </Row>
      <Button className='btn-submit' onClick={handleProcess}>
        {' '}
        Recognize
      </Button>
      <div className='result'>
        {recognizedLabel && (
          <Title level={2}>
            Chữ cái nhận diện là: <span className='number'>{recognizedLabel}</span>
          </Title>
        )}
        {cosineDistance && (
          <Title level={4}>
            Khoảng cách Cosine: <span className='number'>{cosineDistance}</span>
          </Title>
        )}
      </div>
    </div>
  );
};

export default Recognition;
