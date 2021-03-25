import React from 'react';
import AppComponent from '../components/AppComponent';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/SignUp';
export default [
  {
    path: '/',
    exact: true,
    component: AppComponent(Home),
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/signup',
    exact: true,
    component: Signup,
  },
];
