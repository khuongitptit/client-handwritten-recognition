import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import {verifyEmail} from '../../actions/auth'
import { connect } from 'react-redux';
import code2Text from '../../utils/code2Text';
const EmailVerification = props => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const onFinish = values => {
    setLoading(true);
    props.onVerifyEmail(values).then(res => {
      console.log("111111111111",res);
      setTimeout(() => {
        setLoading(false);
        // notify('success', 'signup_successful');
        if(props.next) {
          props.next();
        }
      }, 1000);
    }).catch(err => {
      console.log('err', err);
        setTimeout(() => {
          setLoading(false);
          setError(code2Text[err.message]);
        }, 1000);
    })
  }
  return (
    <div className='card main_info'>
      <p className='signup-title'>Verify your email</p>
      <p className='signup-subtitle'>We sent a 6-digit code to your email, please enter it</p>
      <Form
        name='normal_login'
        className='form'
        initialValues={{ activeCode: '' }}
        onFinish={onFinish}
      >
        <Form.Item name='activeCode'>
          <Input />
        </Form.Item>
        {error !== '' && (
          <Form.Item style={{ margin: '-10px 0px 10px 0', color: '#ff4c4c' }}>{error}</Form.Item>
        )}
        <Form.Item>
          <Button type='primary' htmlType='submit' className='signup-btn' loading={loading}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onVerifyEmail: payload => {
      return verifyEmail(payload)(dispatch);
    }
  }
}

export default connect(null, mapDispatchToProps)(EmailVerification);
