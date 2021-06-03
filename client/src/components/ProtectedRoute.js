import { Redirect, Route } from 'react-router'

const ProtectedRoute = ({ component: Component, user, token, ...rest }) => {
  if (!token || !user) {
    return <Redirect path="/" />
  }

  return <Route {...rest} component={Component} />
}

export default ProtectedRoute
