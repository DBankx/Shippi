import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated === false ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapState = ({ auth }) => ({
  auth
});

export default connect(mapState)(PrivateRoute);
