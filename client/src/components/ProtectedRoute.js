import { Redirect, Route } from 'react-router'

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  currentUser,
  ...rest
}) => {
  if (!isAuthenticated || !currentUser) {
    return <Redirect to="/" />
  }

  return <Route {...rest} component={Component} />
}

export default ProtectedRoute
