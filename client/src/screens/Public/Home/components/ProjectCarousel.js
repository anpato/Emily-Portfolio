import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import Carousel1 from '../../../../assets/carousel1.jpg'
import Carousel2 from '../../../../assets/carousel2.jpg'
import Carousel3 from '../../../../assets/carousel3.jpg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
const ProjectCarousel = () => {
	return (
		<Carousel
			showThumbs={false}
			showArrows={true}
			showStatus={false}
			autoPlay={true}>
			<div>
				<img src={Carousel1} alt="carousel" />
			</div>
			<div>
				<img src={Carousel2} alt="carousel" />
			</div>
			<div>
				<img src={Carousel3} alt="carousel" />
			</div>
		</Carousel>
	)
}

export default ProjectCarousel
