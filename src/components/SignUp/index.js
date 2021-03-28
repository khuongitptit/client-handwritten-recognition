import React, { useState } from 'react';
import _ from 'lodash';
import { Select, Form, Input, Divider, Button, message } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import code2Text from '../../utils/code2Text';
import './index.scss';
import { signUp } from '../../actions/auth';
import baseConstants from '../../constants/base';
import { EMAIL_REGEX, FULLNAME_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '../../utils/regex';
const MONTHS = baseConstants.MONTHS;
const { Option } = Select;
const steps = ['MAIN_INFO', 'BIRTHDAY_INFO', 'EMAIL_VERIFICATION'];
const nextStep = step => {
  return steps[_.indexOf(steps, step) + 1];
};
const Signup = props => {
  const [step, setStep] = useState(_.head(steps));
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formError, setFormError] = useState('');
  const [birthday, setBirthday] = useState({
    date: new Date().getDate(),
    month: MONTHS[new Date().getMonth()],
    year: new Date().getFullYear(),
  });
  const onFinish = (step, values) => {
    setLoading(true);
    props
      .onSubmit(values)
      .then(data => {
        console.log('res', data);
        setTimeout(() => {
          setLoading(false);
          // notify('success', 'signup_successful');
          setStep(nextStep(step));
          if (step === _.last(steps)) {
            setRedirect(true);
          }
        }, 1000);
      })
      .catch(err => {
        console.log('err', err);
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
  const renderMainInfo = () => {
    return (
      <div className='card main_info'>
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
        <Form
          name='normal_login'
          className='form'
          initialValues={{ remember: true }}
          onFinish={values => onFinish('MAIN_INFO', values)}
        >
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
          {formError !== '' && (
            <Form.Item style={{ margin: '-10px 0px 10px 0', color: '#ff4c4c' }}>{formError}</Form.Item>
          )}
          <Form.Item>
            <Button type='primary' htmlType='submit' className='signup-btn' loading={loading}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const onChangeBirthday = (type,value) => {
    setBirthday({...birthday,[type]: value});
  };

  const renderBirthdayInfo = () => {
    return (
      <div className='card main_info'>
        <p className='signup-title'>Add Your Birthday</p>
        <p className='signup-subtitle'>This won't be a part of your public profile.</p>
        <Form
          name='normal_login'
          className='form'
          initialValues={birthday}
          onFinish={values => onFinish('BIRTHDAY_INFO', {birthday: values})}
        >
          <Form.Item name='month'>
            <Select onSelect={value => onChangeBirthday('month', value)} value={birthday.month}>
              {MONTHS.map((month, index) => (
                <Option value={month} key={index}>
                  {month}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='date'>
            <Select onSelect={value => onChangeBirthday('date', value)} value={birthday.date}>
              {_.range(1, new Date(birthday.year, birthday.month, 0).getDate()).map(date => (
                <Option value={date}>{date}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='year'>
            <Select onSelect={value => onChangeBirthday('year', value)} value={birthday.year}>
              {_.range(1910, 2021, 1).map(year => (
                <Option value={year} key={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {formError !== '' && (
            <Form.Item style={{ margin: '-10px 0px 10px 0', color: '#ff4c4c' }}>{formError}</Form.Item>
          )}
          <Form.Item>
            <Button type='primary' htmlType='submit' className='signup-btn' loading={loading}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const renderStep = {
    MAIN_INFO: renderMainInfo(),
    BIRTHDAY_INFO: renderBirthdayInfo(),
  };

  console.log('1111111111111', step);
  return redirect ? (
    <Redirect to='login' />
  ) : (
    <div className='login-signup-wrapper'>
      {renderStep[step]}
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
