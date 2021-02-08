import React from 'react';
import { Menu, Input, Popover, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, HomeOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons';
import Notification from './Notification';
const { Item } = Menu;
const MenuComponent = () => {
  const onSearch = value => {
    console.log('value', value);
  };
  return (
    <Menu mode='horizontal'>
      <Row>
        <Col span={5}>
          <Item key='logo'>
            <Link to='/'>
              <img src='/images/menu/logo.png' />
            </Link>
          </Item>
        </Col>
        <Col span={10}>
          <Item key='search'>
            <Input
              prefix={<SearchOutlined />}
              placeholder='Search'
              allowClear
              onChange={onSearch}
            />
          </Item>
        </Col>
        <Col span={5}>
          <Menu mode='horizontal'>
            <Item key='home'>
              <Link to='/'>
                <HomeOutlined style={{ fontSize: '20px' }} />
              </Link>
            </Item>
            <Item key='notification'>
              <Popover content={Notification} trigger='click'>
                <HeartOutlined style={{ fontSize: '20px' }} />
              </Popover>
            </Item>
            <Item key='user'>
              <Link to='/user'>
                {/* user will be replaced by `username`; ex: 99.knd_ */}
                <UserOutlined style={{ fontSize: '20px' }} />
              </Link>
            </Item>
          </Menu>
        </Col>
      </Row>
    </Menu>
  );
};

export default MenuComponent;
