import React, { useEffect } from 'react'
import Newfeed from '../components/Newfeed/Newfeed'
import { connect } from 'react-redux'
import { actionGetPost } from '../actions/posts'
const NewfeedContainer = props => {
    const { postsreducer, getPosts } = props
    useEffect(() => {
        getPosts()
    }, [])
    return <Newfeed postsreducer={postsreducer} />
}
const mapStateToProps = state => {
    return {
        postsreducer: state.postsreducer,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => {
            dispatch(actionGetPost())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewfeedContainer)
