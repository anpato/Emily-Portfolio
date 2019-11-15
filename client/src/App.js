import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import './styles/App.scss'
import Sidebar from './components/Sidebar'
import { Hamburger } from './components/common'

import AdminSidebar from './components/AdminSidebar'
import Routes from './routes'

function App({ location }) {
  const [open, toggleOpen] = useState(false)
  const toggle = open ? 'open' : null
  return (
    <div className="main">
      {location.pathname.includes('admin') &&
      !location.pathname.includes('login') ? (
        <AdminSidebar open={open} onClick={() => toggleOpen(!open)} />
      ) : location.pathname.includes('login') &&
        !location.pathname.includes('admin') ? (
        <Sidebar open={open} onClick={() => toggleOpen(!open)} />
      ) : (
        <Sidebar open={open} onClick={() => toggleOpen(!open)} />
      )}
      <div className="button-container">
        <Hamburger isOpen={open} onClick={() => toggleOpen(!open)} />
      </div>
      <main className={toggle}>
        <Routes />
      </main>
    </div>
  )
}

export default withRouter(App)
