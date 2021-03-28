import React, { useState } from 'react';
import _ from 'lodash';
import { Popover, Row, Col } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { HomeOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import Notification from './Notification';
import './index.scss';
import { searchProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import SearchProfileDropdown from './SearchProfileDropdown';
import {getCurrentUser} from '../../utils/auth'

const MenuComponent = props => {
  const [foundProfiles, setFoundProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const onSearch = value => {
    if (value === '') {
      setFoundProfiles([]);
      return;
    }
    setLoading(true);
    props
      .searchProfile({ keyword: value })
      .then(data => {
        setFoundProfiles(data);
        setTimeout(() => {
          setLoading(false); 
        },500);
      })
      .catch(err => {
        setTimeout(() => {
          setLoading(false); 
        },500);
      });
  };
  const onSearchDebounce = _.debounce(value => onSearch(value), 500);
  const onSelect = username => {
    props.history.replace(username);
  }
  const username = getCurrentUser();
  return (
    <div className='app-menu'>
      <Row className='app-menu-inner h-center'>
        <Col span={6}>
          <Link to='/'>
            <p className='menu-logo'>Instagram</p>
          </Link>
        </Col>
        <Col span={12}>
          <SearchProfileDropdown
            loading={loading}
            foundProfiles={foundProfiles}
            onChange={value => onSearchDebounce(value)}
            onSelect={onSelect}
          />
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
              <Link to={username}>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuComponent));
