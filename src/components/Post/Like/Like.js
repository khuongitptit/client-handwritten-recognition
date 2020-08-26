import React from 'react'

const Like = props => {
    const { likes, handleLike, profile } = props //like is an array
    const displayLikes = () => {
        return likes.length <= 2
            ? `${likes[0]} and ${likes[1]} like this.`
            : `${likes[0]}, ${likes[1]} and ${likes.length - 2} like this.`
    }
    return (
        <div>
            <div>
                <i className='far fa-heart' onClick={handleLike}></i>
            </div>
            {/* <p>{displayLikes()}</p> */}
        </div>
    )
}

export default Like
