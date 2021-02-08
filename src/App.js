import React from 'react';
import routes from './routes/';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './components/menu';
import 'antd/dist/antd.css';
import './App.scss';
const App = () => {
  const mapRoutes = () => {
    return routes.map((route, index) => {
      return (
        <Route key={index} path={route.path} exact={route.exact} component={route.component} />
      );
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
export default App;
