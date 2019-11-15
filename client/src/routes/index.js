import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Private } from '../screens/App/Private'
import { AnimatedSwitch } from 'react-router-transition'
import { About, Contact, Home, Portfolio } from '../screens/Public'
import AuthenticatedRoute from './AuthenticatedRoute'

const Routes = () => {
  const token = localStorage.getItem('token')
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
    >
      <Route exact path="/" component={props => <Home {...props} />} />
      <Route path="/contact" component={props => <Contact {...props} />} />
      <Route path="/portfolio" component={props => <Portfolio {...props} />} />
      <Route path="/about" component={props => <About {...props} />} />
      <AuthenticatedRoute
        path="/admin"
        token={token}
        render={props => <Private {...props} token={token} />}
      />
    </AnimatedSwitch>
  )
}

export default Routes
