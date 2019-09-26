import React, { Component } from 'react'
import Logo from '../../../assets/logo.png'
class About extends Component {
	render() {
		return (
			<div className="about">
				<article>
					<div>
						<img src={Logo} alt="logo" />
						<h2>About Me</h2>
					</div>

					<div>
						<p>
						I'm Currently a Student at kean university studying Interior Design / Architecture. 
I enjoy taking on difficult and complex problems and turning them into simple and functional spaces that allows everyone to share the same experience within the space. I also love the challenges that come along with design and always strive to make every design sustainable and efficient. 
						</p>
					</div>
				</article>
			</div>
		)
	}
}

export { About }
