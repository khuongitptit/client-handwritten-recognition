import React from 'react';
import {getCurrentUser} from '../../utils/auth'
import {Row, Col } from 'antd'

const Profile = (props) => {
  const isSelf = props.match.params.username === getCurrentUser();
  const renderSelf = () => {
    return <Row>
      <Col span={8}>
        <img />
      </Col>
      <Col span={16}>self </Col>
    </Row>
  }
  const renderPeople = () => {
    return <Row>
    <Col span={8}>
      <img />
    </Col>
    <Col span={16}> people</Col>
  </Row>
  }
  return <div className="profile">
    <div className="info">
      {isSelf ? renderSelf() : renderPeople()}
    </div>
    <div className="post">haha</div>
  </div>;
};
export default Profile;
