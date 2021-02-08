import React from 'react';
import Login from '../login';
const Home = () => {
  const renderHome = () => {
    return <div>home page</div>;
  };
  const renderLogin = () => {
    return <Login />;
  };
  const isAuth = false;
  return isAuth ? renderHome() : renderLogin();
};

export default Home;
