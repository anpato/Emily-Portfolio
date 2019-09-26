import React, { Component } from 'react'
import ProjectCarousel from './components/ProjectCarousel'
import { Button } from '../../../components/common'

class Home extends Component {
	render() {
		return (
			<div className="home">
				<ProjectCarousel />
				<Button onClick={this.props.onClick} title='Portfolio' path='/portfolio' />
			</div>
		)
	}
}

export { Home }
