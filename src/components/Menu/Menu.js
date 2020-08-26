import React, { useState, useEffect } from 'react'
import { Menu, Input } from 'antd'
import axios from 'axios'
import {
    SearchOutlined,
    FacebookOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    LoadingOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './Menu.scss'
const { Item, SubMenu } = Menu
const MenuComponent = props => {
    const { authreducer, responseFacebook, logOut } = props
    const { profile, loading_login, loading_logout, error_login } = authreducer
    return (
        <div className='menu-container'>
            <Menu mode='horizontal'>
                <Item className='logo'>
                    <Link to='/'>
                        <div>
                            <img
                                className='logo-img'
                                alt='Fakebook'
                                src={
                                    process.env.PUBLIC_URL + '/assets/logo.png'
                                }
                            />
                        </div>
                    </Link>
                </Item>
                <Item className='search'>
                    <Input prefix={<SearchOutlined />} />
                </Item>
                {!!profile && !loading_login ? (
                    <SubMenu
                        className='account'
                        title={<img src={profile.avatar} className='avatar' />}
                    >
                        <Item icon={<UserOutlined />}>
                            <Link to={`/${profile.userID}/profile`}>
                                Profile
                            </Link>
                        </Item>
                        <Item icon={<SettingOutlined />}>
                            <Link to={`/${profile.userID}/settings`}>
                                Settings
                            </Link>
                        </Item>
                        <Item
                            icon={<LogoutOutlined />}
                            style={{ borderTop: '1px solid gray' }}
                        >
                            <Link to='/' onClick={logOut}>
                                {loading_logout && <LoadingOutlined />}
                                Log out
                            </Link>
                        </Item>
                    </SubMenu>
                ) : (
                    <Item className='login'>
                        {/* <FacebookLogin
                            appId='755591265227955'
                            fields='name,email,picture.width(800)'
                            callback={responseFacebook}
                            render={renderProps => (
                                <Link to='' onClick={renderProps.onClick}>
                                    {loading_login ? (
                                        <LoadingOutlined spin />
                                    ) : (
                                        <FacebookOutlined />
                                    )}

                                    <span>Login with Facebook</span>
                                </Link>
                            )}
                        /> */}
                        <Link to='/login'>
                            <i className='fas fa-sign-in-alt'></i>&nbsp;Login
                        </Link>
                    </Item>
                )}
            </Menu>
        </div>
    )
}

export default MenuComponent
