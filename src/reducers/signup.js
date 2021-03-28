import authConstants from '../constants/auth'


const defaultState = {}
const signup = (state = defaultState, action) => {
  switch(action.type) {
    case authConstants.SIGNUP_INFO: {
      return {...action.payload};
    }
    default: {
      return state;
    }
  }
}

export default signup;