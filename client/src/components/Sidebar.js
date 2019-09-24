import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from './common'
import Logo from '../assets/logo.png'
const Sidebar = (props) => {
	const [active, setActive] = useState(false)
	const [open, toggleOpen] = useState(false)

	return (
		<div className="sidebar">
			<div className="logo-container">
				<img src={Logo} alt="logo" />
			</div>
			<div className="links">
				<Button
					title="Home"
					path="/"
					className={props.location.pathname === '/' ? 'active' : 'inactive'}
				/>
				<Button
					title="Portfolio"
					path="/portfolio"
					className={
						props.location.pathname === '/portfolio' ? 'active' : 'inactive'
					}
				/>
				<Button
					title="Contact"
					path="/contact"
					className={
						props.location.pathname === '/contact' ? 'active' : 'inactive'
					}
				/>
				<Button
					title="About"
					path="/about"
					className={
						props.location.pathname === '/about' ? 'active' : 'inactive'
					}
				/>
			</div>
			<div className="social"></div>
		</div>
	)
}

export default withRouter(Sidebar)
