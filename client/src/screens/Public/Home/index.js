import React, { Component } from 'react'
import ProjectCarousel from './components/ProjectCarousel'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<ProjectCarousel />
			</div>
		)
	}
}

export { Home }
