import React from 'react'
import './Post.scss'
import LikeContainer from '../../containers/LikeContainer'
import CommentContainer from '../../containers/CommentContainer'
const Post = props => {
    const { post } = props
    const { author, photoUrls, numberOfLike, caption, comments } = post
    return (
        <div className='post'>
            <div className='author'>
                <img src={author.avatar} className='avatar' />
                <span className='name'>{author.name}</span>
            </div>
            <div className='content'>
                <img src={photoUrls[0]} className='photo' />
                <p className='caption'></p>
            </div>
            <div className='interaction'>
                <LikeContainer />
                {/* <CommentContainer /> */}
            </div>
        </div>
    )
}

export default Post
