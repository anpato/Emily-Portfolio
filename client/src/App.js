import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import { About, Contact, Home, Portfolio } from './screens/Public'
import './styles/App.scss'
import Sidebar from './components/Sidebar'
import { Hamburger } from './components/common'
import { Private } from './screens/App/Private'
import AdminSidebar from './components/AdminSidebar'
import AuthenticatedRoute from './routes'

function App({ location }) {
	const [open, toggleOpen] = useState(false)
	const toggle = open ? 'open' : null
	const token = localStorage.getItem('token')
	return (
		<div className='main'>
			{location.pathname.includes('admin') &&
			!location.pathname.includes('login') ? (
				<AdminSidebar open={open} onClick={() => toggleOpen(!open)} />
			) : location.pathname.includes('login') &&
			  !location.pathname.includes('admin') ? (
				<Sidebar open={open} onClick={() => toggleOpen(!open)} />
			) : (
				<Sidebar open={open} onClick={() => toggleOpen(!open)} />
			)}
			<div className='button-container'>
				<Hamburger isOpen={open} onClick={() => toggleOpen(!open)} />
			</div>
			<main className={toggle}>
				<AnimatedSwitch
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}>
					<Route exact path='/' component={(props) => <Home {...props} />} />
					<Route
						path='/contact'
						component={(props) => <Contact {...props} />}
					/>
					<Route
						path='/portfolio'
						component={(props) => <Portfolio {...props} />}
					/>
					<Route path='/about' component={(props) => <About {...props} />} />
					<AuthenticatedRoute
						path='/admin'
						token={token}
						render={(props) => <Private {...props} />}
					/>
				</AnimatedSwitch>
			</main>
		</div>
	)
}

export default withRouter(App)
