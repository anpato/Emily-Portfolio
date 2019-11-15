import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
const ProjectCarousel = ({ projects }) => {
  const renderImages = () => {
    if (projects.length) {
      return projects.map((project, index) => (
        <img key={index} src={project.images[0]} alt="carousel" />
      ))
    }
  }
  return (
    <div className="project-carousel">
      <Carousel
        showThumbs={false}
        showArrows={true}
        showStatus={false}
        autoPlay={true}
      >
        {renderImages()}
      </Carousel>
    </div>
  )
}

export default ProjectCarousel
