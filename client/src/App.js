import { connect } from 'react-redux'
import Routes from './components/Routes'
import { SetCurrentUser, ToggleAuthenticated } from './store/actions'
import { ValidateSession } from './services/auth'
import { useQuery } from 'react-query'
import { Loader } from 'rsuite'

const state = ({ auth }) => ({ ...auth })

const actions = (dispatch) => ({
  setUser: (data) => dispatch(SetCurrentUser(data)),
  toggleAuthenticated: (value) => dispatch(ToggleAuthenticated(value))
})

function App({ toggleAuthenticated, setUser, isAuthenticated, currentUser }) {
  const { isLoading } = useQuery('fetch-admin', async () => {
    const res = await ValidateSession()
    setUser(res.payload.id)
    toggleAuthenticated(true)
    localStorage.setItem('token', res.token)
  })
  if (isLoading) {
    return <Loader center backdrop size="lg" />
  }
  return <Routes currentUser={currentUser} authenticated={isAuthenticated} />
}

export default connect(state, actions)(App)
