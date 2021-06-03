import { connect } from 'react-redux'
import { Container, Drawer, Message } from 'rsuite'
import Navigation from '../components/Navigation'
import { ToggleDrawer } from '../store/actions'
import ProjectForm from './private/ProjectForm'
import ProjectManagement from './private/ProjectManagement'

const state = ({ ui }) => ({ ...ui })
const actions = (dispatch) => ({
  toggleDrawer: (value) => dispatch(ToggleDrawer(value))
})
const Private = ({ drawerShow, toggleDrawer }) => {
  const notfs = [...Array(20)].map((_) => <Message></Message>)
  return (
    <Container>
      <Navigation notifications={0} toggleDrawer={toggleDrawer} />
      <Drawer show={drawerShow} onHide={() => toggleDrawer(false)}>
        <Drawer.Body>{notfs.map((n) => n)}</Drawer.Body>
      </Drawer>
      {/* <ProjectManagement /> */}
      <ProjectForm />
    </Container>
  )
}

export default connect(state, actions)(Private)
