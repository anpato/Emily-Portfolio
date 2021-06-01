import { Header, Nav, Navbar } from 'rsuite'

const Navigation = ({ handleScroll }) => {
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
  return (
    <Header style={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
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
                key={link.path}
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
