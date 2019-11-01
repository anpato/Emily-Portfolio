import React from 'react'
import { Route, Redirect } from 'react-router-dom'
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
		return (
			<Route
				{...rest}
				render={(props) =>
					token ? <Component {...props} /> : <Redirect to='/' />
				}
			/>
		)
	}
}

export default AuthenticatedRoute
