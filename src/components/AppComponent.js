import React from 'react';
import _ from 'lodash';
import { checkAuth } from '../utils/auth';
import { Redirect } from 'react-router-dom';

const AppComponent = WrappedComponent => {
  return class extends React.Component {
    state = {
      auth: true,
    };
    componentWillReceiveProps(nextProps) {
      if (nextProps.children !== this.props.children) {
        this.setState({ auth: checkAuth() });
      }
    }
    componentDidMount() {
      this.setState({ auth: checkAuth() });
    }
    render() {
      return this.state.auth ? <WrappedComponent {...this.props} /> : <Redirect to='/login' />;
    }
  };
};

export default AppComponent;
