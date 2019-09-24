import React from 'react'
import { Route } from 'react-router-dom'
import { Scroll } from 'react-fns'
import { AnimatedSwitch } from 'react-router-transition'
import { About, Contact, Home, Portfolio } from './screens/Public'
import './styles/App.scss'
import Sidebar from './components/Sidebar'

function App() {
	return (
		<div className="main">
			<Scroll render={({ x, y }) => <Sidebar yHeight={y} />} />
			<main>
				<AnimatedSwitch
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}>
					<Route exact path="/" component={(props) => <Home {...props} />} />
					<Route
						path="/contact"
						component={(props) => <Contact {...props} />}
					/>
					<Route
						path="/portfolio"
						component={(props) => <Portfolio {...props} />}
					/>
					<Route path="/about" component={(props) => <About {...props} />} />
				</AnimatedSwitch>
			</main>
		</div>
	)
}

export default App
