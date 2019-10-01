import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import Carousel1 from '../../../../assets/carousel1.jpg'
import Carousel2 from '../../../../assets/carousel2.jpg'
import Carousel3 from '../../../../assets/carousel3.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
const ProjectCarousel = ({ projects }) => {
	const renderImages = () => {
		if (projects.length) {
			return projects.map((project, index) => (
				<div key={index}>
					<img src={project.images[0]} alt='carousel' />
				</div>
			))
		}
	}
	return (
		<Carousel
			showThumbs={false}
			showArrows={true}
			showStatus={false}
			autoPlay={true}>
			{renderImages()}
		</Carousel>
	)
}

export default ProjectCarousel
