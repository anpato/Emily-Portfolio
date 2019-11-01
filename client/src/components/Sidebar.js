import React from 'react'
import { withRouter } from 'react-router-dom'
import { InstagramIcon, LinkedinIcon } from '@patternfly/react-icons'
import { Button } from './common'
import Logo from '../assets/logo.png'

const Sidebar = (props) => {
	const className = props.open ? 'sidebar sidebar-open' : 'sidebar'

	return (
		<div className={className}>
			<div className='logo-container'>
				<img src={Logo} alt='logo' />
			</div>
			<div className='links'>
				<Button
					onClick={props.onClick}
					title='Home'
					path='/'
					className={props.location.pathname === '/' ? 'active' : 'inactive'}
				/>
				<Button
					onClick={props.onClick}
					title='Portfolio'
					path='/portfolio'
					className={
						props.location.pathname === '/portfolio' ? 'active' : 'inactive'
					}
				/>
				<Button
					onClick={props.onClick}
					title='Contact'
					path='/contact'
					className={
						props.location.pathname === '/contact' ? 'active' : 'inactive'
					}
				/>
				<Button
					onClick={props.onClick}
					title='About'
					path='/about'
					className={
						props.location.pathname === '/about' ? 'active' : 'inactive'
					}
				/>
			</div>
			<div>
				<div className='social'>
					<a
						href='https://www.instagram.com/emilymperes_design'
						target='_blank'
						rel='noopener noreferrer'>
						<InstagramIcon size='lg' />
					</a>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.linkedin.com/in/emily-peres-8a04b7188/'>
						<LinkedinIcon size='lg' />
					</a>
				</div>
				<div className='people'>
					<Button path='/admin/login' title='Emily Peres' />
					<a
						href='https://www.linkedin.com/in/anpato/'
						target='_blank'
						rel='noopener noreferrer'>
						Built By Andre Pato
					</a>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Sidebar)
