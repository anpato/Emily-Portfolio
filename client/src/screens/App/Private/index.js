import React from 'react'
import { Route } from 'react-router-dom'
import { Dashboard, Login, Upload } from '../../Private'

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
				<Route
					exact
					path={`${match.url}/upload`}
					render={(props) => <Upload {...props} />}
				/>
			</main>
		</div>
	)
}
