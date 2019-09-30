import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from './common'
import Logo from '../assets/logo.png'

const AdminSidebar = ({ open, location, match, onClick }) => {
	const className = open ? 'sidebar sidebar-open' : 'sidebar'
	return (
		<div className={className}>
			<div className='logo-container'>
				<img src={Logo} alt='logo' />
			</div>
			<div className='links'>
				<Button
					onClick={onClick}
					title='Dashboard'
					path={`/admin/dashboard`}
					className={
						location.pathname === '/admin/dashboard' ? 'active' : 'inactive'
					}
				/>
				<Button
					onClick={onClick}
					title='Upload Project'
					path={`/admin/upload`}
					className={
						location.pathname === '/admin/upload' ? 'active' : 'inactive'
					}
				/>
				<Button
					onClick={onClick}
					title='Log Out'
					path='/'
					className='inactive'
				/>
			</div>
		</div>
	)
}

export default withRouter(AdminSidebar)
