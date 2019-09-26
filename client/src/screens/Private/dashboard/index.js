import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
class Dashboard extends Component {
	render() {
		const token = localStorage.getItem('token')
		if (!token) {
			return <Redirect to="/admin" />
		}
		return <div>Dashboard</div>
	}
}
export { Dashboard }
