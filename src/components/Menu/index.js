import React from 'react';
import { Menu, Input, Popover, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, HomeOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import Notification from './Notification';
import './index.scss';
const { Item } = Menu;
const MenuComponent = () => {
  const onSearch = value => {
    console.log('value', value);
  };
  return (
    <div className='app-menu'>
      <Row className='app-menu-inner h-center'>
        <Col span={6}>
          <Link to='/'>
            <p className='menu-logo'>Instagram</p>
          </Link>
        </Col>
        <Col span={12}>
          <Input
            className='menu-search h-center'
            prefix={<SearchOutlined />}
            placeholder='Search'
            allowClear
            onChange={onSearch}
          />
        </Col>
        <Col span={6} className='menu-right'>
          <Row className="h-center menu-right-inner">
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

export default MenuComponent;
