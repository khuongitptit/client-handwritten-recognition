import React, { useState } from 'react';
import _ from 'lodash';
import { Input, Popover, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, HomeOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import Notification from './Notification';
import './index.scss';
import { searchProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import SearchProfileDropdown from './SearchProfileDropdown';

const MenuComponent = props => {
  const [foundProfiles, setFoundProfiles] = useState([]);
  const onSearch = value => {
    props.searchProfile({ keyword: value }).then(data => setFoundProfiles(data));
  };
  const onSearchDebounce = _.debounce(value => onSearch(value), 500);
  return (
    <div className='app-menu'>
      <Row className='app-menu-inner h-center'>
        <Col span={6}>
          <Link to='/'>
            <p className='menu-logo'>Instagram</p>
          </Link>
        </Col>
        <Col span={12}>
          <SearchProfileDropdown foundProfiles={foundProfiles} onChange={value => onSearchDebounce(value)} />
        </Col>
        <Col span={6} className='menu-right'>
          <Row className='h-center menu-right-inner'>
            <Col span={8}>
              <Link to='/'>
                <HomeOutlined className='home-icon menu-icon' />
              </Link>
            </Col>
            <Col span={8}>
              <Popover content={Notification} trigger='click'>
                <HeartOutlined className='heart-icon menu-icon' />
              </Popover>
            </Col>
            <Col span={8}>
              <Link to='/user'>
                {/* user will be replaced by `username`; ex: 99.knd_ */}
                <UserOutlined className='user-icon menu-icon' />
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    searchProfile: payload => {
      return searchProfile(payload)(dispatch);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
