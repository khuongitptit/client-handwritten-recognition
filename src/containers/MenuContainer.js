import React, { useEffect } from 'react'
import Menu from '../components/Menu/Menu'
import { connect } from 'react-redux'
import { actionLogin, actionLogout } from '../actions/auth'
const MenuContainer = props => {
    const { authreducer, login, logOut } = props
    const responseFacebook = response => {
        console.log(response)
        login(response)
    }
    return (
        <Menu
            authreducer={authreducer}
            responseFacebook={responseFacebook}
            logOut={logOut}
        />
    )
}
const mapStateToProps = state => {
    return {
        authreducer: state.authreducer,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: auth => {
            dispatch(actionLogin(auth))
        },
        logOut: () => {
            dispatch(actionLogout())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
