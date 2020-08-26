import React, { useEffect } from 'react'
import Signup from '../pages/Signup/Signup'
import { connect } from 'react-redux'
import { actionSignup } from '../actions/auth'
const SignupContainer = props => {
    const { authreducer, signup } = props
    const handleSignup = data => {
        signup(data)
    }
    return <Signup handleSignup={handleSignup} authreducer={authreducer} />
}
const mapStateToProps = state => {
    return {
        authreducer: state.authreducer,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signup: signupData => {
            dispatch(actionSignup(signupData))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)
