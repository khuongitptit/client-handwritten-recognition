import React from 'react';
import _ from 'lodash';
import { Dropdown, Input, Menu } from 'antd';
import { SearchOutlined ,LoadingOutlined } from '@ant-design/icons';
const { Item } = Menu;

const SearchProfileDropdown = props => {
  const { foundProfiles, loading } = props;
  const menu = () => {
    return (
      <Menu>
        {!loading ? foundProfiles.map(profile => (
          <Item key={profile._id} onClick={() => props.onSelect(profile.username)}>
            <img src='' />
            <span>{profile.username}</span>
          </Item>
        )) : <Item style={{textAlign:'center'}}><LoadingOutlined /></Item>}
      </Menu>
    );
  };
  return (
    <Dropdown overlay={menu} visible={!_.isEmpty(foundProfiles)}>
      <Input
        className='menu-search h-center'
        prefix={<SearchOutlined />}
        placeholder='Search'
        allowClear
        onChange={e => props.onChange(e.target.value)}
      />
    </Dropdown>
  );
};

export default SearchProfileDropdown;
