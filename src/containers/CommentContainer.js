import React from 'react'
import { connect } from 'react-redux'
import { actionAddComment } from '../actions/posts'
import Comment from '../components/Post/Comment/Comment'
const CommentContainer = props => {
    const { postComment } = props
    const onPostComment = comment => {
        postComment(comment)
    }
    return <Comment handlePostComment={onPostComment} />
}

const mapDispatchToProps = dispatch => {
    return {
        postComment: comment => {
            dispatch(actionAddComment(comment))
        },
    }
}
export default connect(null, mapDispatchToProps)(CommentContainer)
