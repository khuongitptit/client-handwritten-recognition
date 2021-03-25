import _ from 'lodash';
import React, { useState } from 'react';
import { Row, Col, Form, Input, Divider, Button } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './index.scss';
import { Link, Redirect } from 'react-router-dom';
import Slider from 'react-slick';
import authConstants from '../../constants/auth';
import code2Text from '../../utils/code2Text';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { appLoad } from '../../actions/app';

const ImageSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'login-image-slider',
    autoplay: true,
    fade: true,
  };
  return (
    <Slider {...settings}>
      {authConstants.imgs.map(img => (
        <img className='login-slider-img' src={img} />
      ))}
    </Slider>
  );
};
const Login = props => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formError, setFormError] = useState('');

  const onFinish = values => {
    setLoading(true);
    props
      .onSubmit(values)
      .then(data => {
        setTimeout(() => {
          setLoading(false);
          if (_.has(data, 'accessToken')) {
            localStorage.setItem('auth', JSON.stringify(data));
            setRedirect(true);
            props.appLoad();
          }
        }, 1000);
      })
      .catch(err => {
        console.log('errrr', err);
        setTimeout(() => {
          setFormError(code2Text[err.message]);
          setLoading(false);
        }, 1000);
      });
  };
  const responseFacebook = data => {
    console.log('fb', data);
  };
  return redirect ? (
    <Redirect from='*' to='' />
  ) : (
    <div className='login-signup-wrapper'>
      <Row className='login-signup-inner h-center'>
        <Col span={12} className='left'>
          <img className='phone' src='/images/login/phone.png' />
          {/* <ImageSlider /> */}
        </Col>
        <Col span={12} className='right'>
          <div className='card h-center'>
            <p className='logo'>Instagram</p>
            <Form name='normal_login' className='form' initialValues={{ remember: true }} onFinish={onFinish}>
              <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input placeholder='Username' />
              </Form.Item>
              <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder='Password' />
              </Form.Item>
              {formError !== '' && (
                <Form.Item style={{ margin: '-10px 0px 10px 0', color: '#ff4c4c' }}>{formError}</Form.Item>
              )}
              <Form.Item>
                <Button type='primary' htmlType='submit' className='login-btn' loading={loading}>
                  Log in
                </Button>
              </Form.Item>
              <Divider>OR</Divider>
              <Form.Item>
                <FacebookLogin
                  appId='341069720277143'
                  fields='name,first_name,last_name,email,picture'
                  scope='email,instagram_basic,pages_show_list'
                  callback={data => responseFacebook(data)}
                  render={renderProps => (
                    <div onClick={renderProps.onClick} className='facebook-login'>
                      <img alt='' className='facebook-icon' src='/images/login/facebook-icon.png' />
                      Login with Facebook
                    </div>
                  )}
                />
              </Form.Item>
            </Form>
          </div>
          <div className='redirect-card h-center'>
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => {
    return login(payload)(dispatch);
  },
  appLoad: () => {
    dispatch(appLoad());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
