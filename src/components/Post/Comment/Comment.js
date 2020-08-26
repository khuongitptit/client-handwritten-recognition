import React, { useState } from 'react'

const Comment = props => {
    const { comment } = props
    const { handlePostComment } = props
    const { authorName, commentContent } = comment
    const [cmtText, setCmtText] = useState('')
    return (
        <div className='comment'>
            <p className='author-name'>{authorName}</p>{' '}
            <span className='content'>{commentContent}</span>
            <div className='add-comment'>
                <input
                    type='text'
                    onChange={e => {
                        setCmtText(e.target.value)
                    }}
                    value={cmtText}
                />
                <button className='post' onClick={handlePostComment}>
                    Post
                </button>
            </div>
        </div>
    )
}

export default Comment
