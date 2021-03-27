import React from 'react';
import { Dropdown, Input, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Item } = Menu;

const SearchProfileDropdown = props => {
  const { foundProfiles } = props;
  const menu = () => {
    return (
      <Menu>
        {foundProfiles.map(profile => (
          <Item key={profile._id}>
            <img src='' />
            <span>{profile.username}</span>
          </Item>
        ))}
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
