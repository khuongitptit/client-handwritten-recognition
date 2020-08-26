import React from 'react'
import Login from '../pages/Login/Login'
import { connect } from 'react-redux'
import { actionLogin } from '../actions/auth'
const LoginContainer = props => {
    const { authreducer, login } = props
    const handleLogin = data => {
        login(data)
    }
    return <Login handleLogin={handleLogin} authreducer={authreducer} />
}
const mapStateToProps = state => {
    return {
        authreducer: state.authreducer,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: loginData => {
            dispatch(actionLogin(loginData))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
