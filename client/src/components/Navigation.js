import { useHistory, useLocation } from 'react-router'
import { Header, Nav, Navbar } from 'rsuite'

const Navigation = () => {
  // const location = useLocation()
  const history = useHistory()
  const navLinks = [
    { path: '/', text: 'Home', onSelect: (path) => history.push(path) },
    {
      path: '/gallery',
      text: 'Gallery',
      onSelect: (path) => history.push(path)
    },
    { path: '/about', text: 'About', onSelect: (path) => history.push(path) }
  ]
  return (
    <Header style={{ position: 'fixed', width: '100%', zIndex: 10000 }}>
      <Navbar appearance="default">
        <Navbar.Header>
          <img
            src="https://d2zapy0kvendcq.cloudfront.net/assets/logo.png"
            style={{ maxHeight: '90%', margin: 'auto 1em' }}
          />
        </Navbar.Header>
        <Navbar.Body>
          <Nav style={{ fontWeight: '800' }}>
            {navLinks.map((link) => (
              <Nav.Item
                key={link.path}
                // active={location.pathname === link.path}
                onSelect={() => link.onSelect(link.path)}
              >
                {link.text}
              </Nav.Item>
            ))}
          </Nav>
          <Nav pullRight></Nav>
        </Navbar.Body>
      </Navbar>
    </Header>
  )
}

export default Navigation
