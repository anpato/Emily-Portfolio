import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import { Dashboard } from '../../Private'
import Login from '../../Private/login/Login'

export const Private = ({ match }) => {
	return (
		<div className="main">
			<main>
				<Route exact path="/admin" render={(props) => <Login {...props} />} />
				<Route
					exact
					path={`${match.url}/dashboard`}
					render={(props) => <Dashboard {...props} />}
				/>
			</main>
		</div>
	)
}
