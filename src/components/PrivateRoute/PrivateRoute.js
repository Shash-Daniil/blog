import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from '../../Routes';

const PrivateRoute = (props) => {
  const { children, isLogged, ...rest } = props;

  return <Route {...rest} render={() => (isLogged ? children : <Redirect to={Routes.SIGN_IN_PAGE} />)} />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLogged: state.userReducer.logged,
});

export default connect(mapStateToProps, {})(PrivateRoute);
