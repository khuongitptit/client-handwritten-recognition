import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
const { Item } = Form
const Login = props => {
    const { handleLogin, authreducer } = props
    const { logging_in, login_success, login_fail } = authreducer
    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required!'),
        password: yup.string().required('Password is required'),
    })
    return (
        <div>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={values => props.handleLogin(values)}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                }) => (
                    <Form onFinish={handleSubmit}>
                        <Item
                            label='Username'
                            hasFeedback={values.username !== ''}
                            help={errors.username}
                        >
                            <Input
                                name='username'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                        </Item>
                        <Item
                            label='Password'
                            hasFeedback={values.password !== ''}
                            help={errors.password}
                        >
                            <Input.Password
                                name='password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </Item>
                        {!!login_fail && (
                            <Item>
                                <span>
                                    <i className='fas fa-exclamation-triangle'></i>
                                    &nbsp;{login_fail.message}
                                </span>
                            </Item>
                        )}
                        <Item>
                            <Button type='primary' htmlType='submit'>
                                Log in
                            </Button>
                        </Item>
                    </Form>
                )}
            </Formik>
            <div className='direct-to-sign-up'>
                <span>
                    Not have account yet? <Link to='/signup'>Sign up now</Link>
                </span>
            </div>
        </div>
    )
}

export default Login
