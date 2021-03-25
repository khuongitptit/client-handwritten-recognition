import React from 'react';
import { Route, Redirect }  from 'react-router';

import {checkToken} from '../utils/auth';

const AppRoute = ({
  component: Component,
  auth = true, ...rest
}) => {
  return <Route {...rest} render={(props) => (
    (!auth || (auth && checkToken() === true))
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />;
};
export default AppRoute;