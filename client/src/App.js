import React from 'react'
import { Container } from 'rsuite'
import Navigation from './components/Navigation'
import Routes from './components/Routes'

function App() {
  return (
    <Container style={{ height: '100vh' }}>
      <Navigation />
      <Routes />
    </Container>
  )
}

export default App
