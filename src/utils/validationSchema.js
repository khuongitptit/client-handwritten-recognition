import * as yup from 'yup';
const signUp = yup.object().shape({
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
    .matches(/^[\w\d]{8,32}$/, 'Username should contain only lowercase characters and digits!'),
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
    then: yup.string().oneOf([yup.ref('password')], 'Confirm password is not matches'),
  }),
});

export default {
  signUp,
};
