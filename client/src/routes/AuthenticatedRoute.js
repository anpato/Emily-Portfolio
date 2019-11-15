import React from 'react'
import { Route } from 'react-router-dom'
import { Login } from '../screens/Private'
const AuthenticatedRoute = ({
  render: Component,
  children,
  token,
  render,
  ...rest
}) => {
  if (token && render) {
    return <Route {...rest} render={Component} />
  } else {
    return (
      <Route
        {...rest}
        path="/admin/login"
        render={props => <Login {...props} />}
      />
    )
  }
}

export default AuthenticatedRoute
