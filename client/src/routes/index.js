import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Login } from '../screens/Private'
const AuthenticatedRoute = ({
	component: Component,
	children,
	token,
	render,
	...rest
}) => {
	if (token && render) {
		return <Route {...rest} render={render} />
	} else {
		return <Route {...rest} render={(props) => <Login {...props} />} />
	}
}

export default AuthenticatedRoute
