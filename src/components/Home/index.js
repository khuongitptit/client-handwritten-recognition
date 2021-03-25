import { Button } from 'antd';
import React, { useState } from 'react';
import UploadImage from '../ModalUploadImage';
import FeedPost from '../FeedPost/FeedPost'
import { connect } from 'react-redux';

const Home = () => {
  const [modalUploadImageVisible, setModalUploadImageVisible] = useState(false);
  const handleCancelModal = () => {
    setModalUploadImageVisible(false);
  };
  return (
    <div className='new-feed'>
      <div className='upload-image-post'>
        <Button type='primary' onClick={() => setModalUploadImageVisible(true)}>
          Add post
        </Button>
        <UploadImage visible={modalUploadImageVisible} handleCancelModal={handleCancelModal} />
      </div>
      <div className='new-feed-posts'></div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    db: state.db,
  }
}


export default connect(mapStateToProps,)(Home);
