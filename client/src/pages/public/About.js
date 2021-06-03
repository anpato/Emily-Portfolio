import { Divider } from 'rsuite'
import React from 'react'
const About = React.forwardRef((_, ref) => {
  return (
    <section id="about">
      <section className="container-wrapper" ref={ref}>
        <h3>About Me</h3>
        <Divider />
        <p>
          I'm Currently a Student at kean university studying Interior Design /
          Architecture. I enjoy taking on difficult and complex problems and
          turning them into simple and functional spaces that allows everyone to
          share the same experience within the space. I also love the challenges
          that come along with design and always strive to make every design
          sustainable and efficient.
        </p>
      </section>
    </section>
  )
})

export default About
