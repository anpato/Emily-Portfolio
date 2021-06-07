import { connect } from 'react-redux'
import { Container, Drawer } from 'rsuite'
import Navigation from '../components/Navigation'
import { ToggleDrawer } from '../store/actions'

const state = ({ ui, auth }) => ({ ...ui, auth })
const actions = (dispatch) => ({
  toggleDrawer: (value) => dispatch(ToggleDrawer(value))
})
const Private = ({ drawerShow, toggleDrawer, children, auth }) => {
  return (
    <Container>
      <Navigation
        notifications={0}
        toggleDrawer={toggleDrawer}
        authenticated={auth.isAuthenticated}
      />
      <Drawer show={drawerShow} onHide={() => toggleDrawer(false)}>
        <Drawer.Body></Drawer.Body>
      </Drawer>
      {children}
    </Container>
  )
}

export default connect(state, actions)(Private)
