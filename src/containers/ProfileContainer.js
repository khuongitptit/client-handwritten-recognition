import React from 'react'
import { connect } from 'react-redux'
import Profile from '../pages/Profile/Profile'
const ProfileContainer = props => {
    const { authreducer } = props
    const { profile, ownPosts, followers, followings } = authreducer
    return <Profile profile={profile} />
}
const mapStateToProps = state => {
    return {
        authreducer: state.authreducer,
    }
}
const mapDispatchToProps = dispatch => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
