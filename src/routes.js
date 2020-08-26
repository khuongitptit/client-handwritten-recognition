import React from 'react'
import HomeContainer from './containers/HomeContainer'
import LoginContainer from './containers/LoginContainer'
import ProfileContainer from './containers/ProfileContainer'
import SettingsContainer from './containers/SettingsContainer'
import SignupContainer from './containers/SignupContainer'
export default [
    {
        path: '/',
        exact: true,
        component: () => <HomeContainer />,
    },
    {
        path: '/login',
        exact: true,
        component: () => <LoginContainer />,
    },
    {
        path: '/signup',
        exact: true,
        component: () => <SignupContainer />,
    },
    {
        path: '/:userID/profile',
        exact: true,
        component: () => <ProfileContainer />,
    },
    {
        path: '/:userID/settings',
        exact: true,
        component: () => <SettingsContainer />,
    },
]
