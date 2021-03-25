import React from 'react';

const FeedPost = (props) => {
  const {post} = props;
  const {author, imageURLs, caption} = post;
  return (
    <div className="feed-post-wrappper">
      <div className="header">
        
      </div>
      <div className="main">
        <img src={imageURLs[0]} alt="0"/>
      </div>
      <div className="details">
        <p>{caption}</p>
      </div>
    </div>
  );
};

export default FeedPost;