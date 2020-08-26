import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
const { Item } = Form
const Signup = props => {
    const { authreducer } = props
    const { signing_up, signup_success, signup_fail } = authreducer
    const history = useHistory()
    useEffect(() => {
        if (signup_success) {
            message.success({ content: 'Sign up successful!' })
            history.push('/login')
        }
    }, [signup_success])
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Name is required!')
            .matches(
                /^[A-Z][a-z]*\s([A-Z][a-z]*\s)*([AEIOU][a-z]*|[^AEIOU][a-z]+)\s*$/,
                'Name is invalid!'
            ),
        username: yup
            .string()
            .required('Username is required!')
            .min(8, 'Username must be longer than 8 characters')
            .max(32, 'Username must be 30 characters or less!')
            .matches(
                /^[\w\d]{8,32}$/,
                'Username should contain only lowercase characters and digits!'
            ),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password must be longer than 6 characters!')
            .max(32, 'Password must be 32 characters or less!')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,32}$/,
                'Password should container both lowercase, uppercase characters and digits!'
            ),
        confirmPassword: yup.string().when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: yup
                .string()
                .oneOf(
                    [yup.ref('password')],
                    'Confirm password is not matches'
                ),
        }),
    })
    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                }}
                onSubmit={values => props.handleSignup(values)}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched,
                }) => (
                    <Form onFinish={handleSubmit}>
                        <Item
                            label='Name'
                            hasFeedback={touched.name}
                            validateStatus={!errors.name ? 'success' : 'error'}
                            help={values.name !== '' && errors.name}
                        >
                            <Input
                                name='name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                        </Item>
                        <Item
                            label='Username'
                            hasFeedback={touched.username}
                            validateStatus={
                                !errors.username ? 'success' : 'error'
                            }
                            help={values.username !== '' && errors.username}
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
                            hasFeedback={touched.password}
                            validateStatus={
                                !errors.password ? 'success' : 'error'
                            }
                            help={values.password !== '' && errors.password}
                        >
                            <Input.Password
                                name='password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </Item>
                        <Item
                            label='Confirm password'
                            hasFeedback={touched.confirmPassword}
                            validateStatus={
                                !errors.confirmPassword ? 'success' : 'error'
                            }
                            help={errors.confirmPassword}
                        >
                            <Input.Password
                                name='confirmPassword'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                            />
                        </Item>
                        {!!signup_fail && (
                            <Item>
                                <span>
                                    <i className='fas fa-exclamation-triangle'></i>
                                    &nbsp;{signup_fail.message}
                                </span>
                            </Item>
                        )}
                        <Item>
                            <Button type='primary' htmlType='submit'>
                                Sign up
                            </Button>
                        </Item>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Signup
