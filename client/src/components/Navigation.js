import { useHistory } from 'react-router-dom'
import { Badge, Header, Icon, Nav, Navbar } from 'rsuite'

const Navigation = ({ handleScroll, toggleDrawer, notifications }) => {
  const history = useHistory()
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
      onSelect: () => {}
    },
    {
      path: '/messages',
      text: 'Messages',
      disabled: true,
      onSelect: () => {}
    },
    {
      path: '/gallery',
      text: 'Gallery',

      onSelect: () => {}
    }
  ]

  const publicOptions = (
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
              key={link.path}
              onSelect={() => link.onSelect(link.path)}
            >
              {link.text}
            </Nav.Item>
          ))}
        </Nav>
      </Navbar.Body>
    </Navbar>
  )

  const privateOptions = (
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

  return (
    <Header style={{ width: '100%', zIndex: 1000 }}>{privateOptions}</Header>
  )
}

export default Navigation
