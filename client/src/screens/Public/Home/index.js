import React, { Component } from 'react'
import ProjectCarousel from './components/ProjectCarousel'
import { Button, Spinner } from '../../../components/common'
import { getCarouselImages } from '../../../services/ApiServices'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			projects: [],
			loading: false
		}
	}
	async componentDidMount() {
		this.setState({ loading: true })
		await this.fetchImages()
	}

	fetchImages = async () => {
		try {
			const projects = await getCarouselImages()
			this.setState({ projects, loading: false })
		} catch (error) {
			throw error
		}
	}

	render() {
		return (
			<div className='home'>
				{this.state.loading ? (
					<Spinner color='#023752' />
				) : (
					<ProjectCarousel projects={this.state.projects} />
				)}

				<Button
					onClick={this.props.onClick}
					title='Portfolio'
					path='/portfolio'
				/>
			</div>
		)
	}
}

export { Home }
