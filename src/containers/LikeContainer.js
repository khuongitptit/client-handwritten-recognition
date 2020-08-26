import React from 'react'
import { connect } from 'react-redux'
import Like from '../components/Post/Like/Like'
import { actionLike } from '../actions/posts'
const LikeContainer = props => {
    const { likes, onLike, profile } = props
    const handleLike = like => {
        onLike(like)
    }
    return <Like handleLike={handleLike} profile={profile} />
}
const mapStateToProps = state => {
    return {
        profile: state.authreducer.profile,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLike: like => {
            dispatch(actionLike(like))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LikeContainer)
