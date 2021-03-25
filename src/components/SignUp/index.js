import React, { useState } from 'react';
import _ from 'lodash';
import { Row, Col, Form, Input, Divider, Button, message } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import code2Text from '../../utils/code2Text';
import './index.scss';
import { signUp } from '../../actions/auth';
import { EMAIL_REGEX, FULLNAME_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '../../utils/regex';

const Signup = props => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formError, setFormError] = useState('');
  const onFinish = values => {
    setLoading(true);
    props
      .onSubmit(values)
      .then(data => {
        console.log('res', data);
        setTimeout(() => {
          setLoading(false);
          setRedirect(true);
          notify('success', 'signup_successful');
        }, 1000);
      })
      .catch(err => {
        console.log("err",err)
        setTimeout(() => {
          setLoading(false);
          setFormError(code2Text[err.message]);
        }, 1000);
      });
  };
  const responseFacebook = data => {
    console.log('fb', data);
  };
  const notify = (result, code) => {
    message[result](code2Text[code], 5);
  };
  return redirect ? (
    <Redirect to='login' />
  ) : (
    <div className='login-signup-wrapper'>
      <div className='card'>
        <p className='logo'>Instagram</p>
        <p className='signup-subtitle'>Sign up to see photos and videos from your friends.</p>
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
        <Divider>OR</Divider>
        <Form name='normal_login' className='form' initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            hasFeedback
            name='email'
            rules={[
              { required: true, message: 'Please input your email address!' },
              { pattern: EMAIL_REGEX, message: 'Email is invalid' },
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item
            hasFeedback
            name='fullname'
            rules={[
              { required: true, message: 'Please input your full name!' },
              { pattern: FULLNAME_REGEX, message: 'Fullname is invalid' },
            ]}
          >
            <Input placeholder='Fullname' />
          </Form.Item>
          <Form.Item
            hasFeedback
            name='username'
            rules={[
              { required: true, message: 'Please input your username!' },
              { pattern: USERNAME_REGEX, message: 'Username is invalid' },
            ]}
          >
            <Input placeholder='Username' />
          </Form.Item>
          <Form.Item
            hasFeedback
            name='password'
            rules={[
              { required: true, message: 'Please input your password!' },
              { pattern: PASSWORD_REGEX, message: 'Password is invalid' },
            ]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>
          {
            formError!== '' && <Form.Item style={{margin:'-10px 0px 10px 0', color:'#ff4c4c'}}>
              {formError}
            </Form.Item>
          }
          <Form.Item>
            <Button type='primary' htmlType='submit' className='signup-btn' loading={loading}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='redirect-card'>
        Have an account? <Link to='/login'>Log in</Link>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => ({
  onSubmit: payload => {
    return signUp(payload)(dispatch);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
