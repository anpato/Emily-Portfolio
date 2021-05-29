import React from 'react'
import { Container } from 'rsuite'
import Navigation from './components/Navigation'
import Routes from './components/Routes'
import Home from './pages/Home'
import Projects from './pages/Projects'

function App() {
  return (
    <Container style={{ height: '100vh' }}>
      <Navigation />
      <Home />
      <Projects />
    </Container>
  )
}

export default App
