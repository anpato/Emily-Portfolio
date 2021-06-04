import { useHistory, useLocation } from 'react-router-dom'
import { Badge, Header, Icon, Nav, Navbar } from 'rsuite'

const Navigation = ({ handleScroll, toggleDrawer, notifications }) => {
  const history = useHistory()
  const location = useLocation()
  const navLinks = [
    {
      path: '/',
      text: 'Home',
      onSelect: handleScroll
    },
    { path: '/about', text: 'About', onSelect: () => handleScroll('/about') },
    {
      path: '/gallery',
      text: 'Gallery',
      onSelect: () => handleScroll('/gallery')
    },

    {
      path: '/contact',
      text: 'Contact',
      onSelect: () => handleScroll('/contact')
    }
  ]

  const privNavLinks = [
    {
      path: '/dashboard',
      text: 'Dashboard',
      onSelect: () => history.push('/dashboard')
    },
    {
      path: '/messages',
      text: 'Messages',
      disabled: true,
      onSelect: () => {}
    }
  ]

  const publicOptions = (
    <Header style={{ width: '100%', zIndex: 1000 }}>
      <Navbar appearance="default">
        <Navbar.Header>
          <img
            src="https://d2zapy0kvendcq.cloudfront.net/assets/logo-light.png"
            style={{ maxHeight: '90%', margin: 'auto 1em' }}
            alt=""
          />
        </Navbar.Header>
        <Navbar.Body>
          <Nav style={{ fontWeight: '800' }}>
            {navLinks.map((link) => (
              <Nav.Item
                className="nav-link"
                active={location.pathname.includes(link.path)}
                key={link.path}
                onSelect={() => link.onSelect(link.path)}
              >
                {link.text}
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Body>
      </Navbar>
    </Header>
  )

  const privateOptions = (
    <Navbar appearance="inverse">
      <Navbar.Header>
        <img
          src="https://d2zapy0kvendcq.cloudfront.net/assets/logo-light.png"
          style={{ maxHeight: '90%', margin: 'auto 1em' }}
          alt=""
        />
      </Navbar.Header>
      <Navbar.Body>
        <Nav style={{ fontWeight: '800' }}>
          {privNavLinks.map((link) => (
            <Nav.Item
              disabled={link.disabled || false}
              className="nav-link"
              key={link.path}
              onSelect={() => link.onSelect(link.path)}
            >
              {link.text}
            </Nav.Item>
          ))}
        </Nav>
        <Nav pullRight>
          <Nav.Item
            disabled
            onSelect={() => toggleDrawer(true)}
            className="nav-link"
          >
            {notifications && notifications.length ? (
              <Badge content={notifications}>
                <Icon icon="bell" />
              </Badge>
            ) : (
              <Icon icon="bell" />
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  )

  return privateOptions
}

export default Navigation
