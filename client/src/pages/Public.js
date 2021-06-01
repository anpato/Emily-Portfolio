import { connect } from 'react-redux'
import { useRef } from 'react'
import { Container, Modal } from 'rsuite'
import Navigation from '../components/Navigation'
import Contact from './Contact'
import Home from './Home'
import Projects from './Projects'
import About from './About'
import Footer from './Footer'
import Policy from '../components/Policy'
import { TogglePolicy } from '../store/actions'

const state = ({ ui }) => ({ ...ui })
const actions = (dispatch) => ({
  toggleModal: (value) => dispatch(TogglePolicy(value))
})
const Public = ({ policyShow, toggleModal }) => {
  const galRef = useRef()
  const abRef = useRef()
  const ctRef = useRef()
  const handleScroll = (path) => {
    switch (path) {
      case '/gallery':
        galRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' })
        break
      case '/about':
        abRef.current.scrollIntoView({ behavior: 'smooth' })
        break
      case '/contact':
        ctRef.current.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        window.scrollTo(0, 0)
        break
    }
  }

  return (
    <Container style={{ height: '100vh' }}>
      <Modal full backdrop show={policyShow} onHide={() => toggleModal(false)}>
        <Modal.Header>
          <Modal.Title>Privacy Policy</Modal.Title>
          <Modal.Body>
            <Policy />
          </Modal.Body>
        </Modal.Header>
      </Modal>
      <Navigation handleScroll={handleScroll} />
      <Home handleScroll={handleScroll} />
      <About ref={abRef} />
      <Projects ref={galRef} />
      <Contact ref={ctRef} />
      <Footer toggleModal={toggleModal} />
    </Container>
  )
}

export default connect(state, actions)(Public)
