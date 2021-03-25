import React, { useEffect } from 'react';
import routes from './routes/';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import { appLoad } from './actions/app';
import 'antd/dist/antd.css';
import './App.scss';
import { connect } from 'react-redux';
const App = (props) => {
  useEffect(() => {
    props.appLoad();
  }, []);
  const mapRoutes = () => {
    return routes.map((route, index) => {
      return <Route key={index} path={route.path} exact={route.exact} component={route.component} />;
    });
  };
  return (
    <div className='app'>
      <BrowserRouter>
        <Menu />
        <Switch>{mapRoutes()}</Switch>
      </BrowserRouter>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    appLoad: () => dispatch(appLoad()),
  };
};
export default connect(null, mapDispatchToProps)(App);
