import React, { Component } from 'react'
import StackGrid, { transitions } from 'react-stack-grid'
import { getProjects } from '../../../services/ApiServices'
import { Carousel } from 'react-responsive-carousel'

const { scaleDown } = transitions

class Portfolio extends Component {
	constructor(props) {
		super(props)
		this.state = {
			projects: [],
			projectDisplayed: null,
			loading: false
		}
	}

	async componentDidMount() {
		this.setState({
			loading: true
		})
		await this.fetchProjects()
	}

	fetchProjects = async () => {
		try {
			const projects = await getProjects()
			const projectDisplayed = projects.splice(0, 1)
			this.setState({
				projects,
				projectDisplayed: projectDisplayed[0],
				loading: false
			})
			console.log(this.state.projectDisplayed)
		} catch (error) {}
	}

	swapProject = (index, project) => {
		this.setState({
			projectDisplayed: this.state.projects.splice(index, 1),
			projects: [...this.state.projects, project]
		})
		return this.top.scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		})
	}

	renderProjects = () => {
		if (this.state.projects.length) {
			return this.state.projects.map((project, index) => {
				return (
					<img
						className={
							this.state.projectDisplayed._id === project._id
								? 'project-card selected'
								: 'project-card'
						}
						key={project._id}
						src={project.images[0]}
						alt={project.images[0]}
						onClick={() => this.swapProject(index, project)}
					/>
				)
			})
		}
	}

	renderCarousel = (images) => {
		if (images.length) {
			return this.state.projectDisplayed.images.map((project, index) => (
				<div key={index}>
					<img src={project} alt='carousel' />
				</div>
			))
		}
	}
	renderHero = () => {
		if (this.state.projectDisplayed) {
			return (
				<section className='hero'>
					<div className='carousel-container'>
						<Carousel
							showThumbs={false}
							showArrows={true}
							showStatus={false}
							autoPlay={true}>
							{this.renderCarousel(this.state.projectDisplayed.images)}
						</Carousel>
					</div>
					<div className='details'>
						<h3>{this.state.projectDisplayed.title}</h3>
						<p>{this.state.projectDisplayed.description}</p>
					</div>
				</section>
			)
		}
	}

	render() {
		return (
			<div className='portfolio' ref={(top) => (this.top = top)}>
				{this.renderHero()}
				<div className='projects-container'>
					<StackGrid
						monitorImagesLoaded={true}
						columnWidth={200}
						gutterWidth={20}
						gutterHeight={20}
						appear={scaleDown.appear}
						appeared={scaleDown.flip}>
						{this.renderProjects()}
					</StackGrid>
				</div>
			</div>
		)
	}
}

export { Portfolio }
