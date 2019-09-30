import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getProjects } from '../../../services/ApiServices'
class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			projects: [],
			loading: false
		}
	}

	async componentDidMount() {
		this.setState({ loading: true })
		await this.fetchProjects()
	}

	fetchProjects = async () => {
		try {
			const projects = await getProjects()
			this.setState({ projects, loading: false })
		} catch (error) {
			console.log(error)
		}
	}

	renderProjects = () => {
		if (this.state.projects.length) {
			return this.state.projects.map((project) => {
				return <div key={project._id}></div>
			})
		}
	}

	render() {
		const token = localStorage.getItem('token')
		if (!token) {
			return <Redirect to='/admin' />
		}
		return <div>Dashboard</div>
	}
}
export { Dashboard }
