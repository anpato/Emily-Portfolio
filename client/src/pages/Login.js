import { useMutation } from 'react-query'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Alert,
  Button,
  ButtonToolbar,
  Container,
  Content,
  ControlLabel,
  FlexboxGrid,
  Form,
  FormGroup,
  Input,
  Panel
} from 'rsuite'
import Navigation from '../components/Navigation'
import { SignIn } from '../services/auth'
import {
  ResetAuth,
  SetAuthForm,
  SetCurrentUser,
  ToggleAuthenticated
} from '../store/actions'
import Footer from './public/Footer'

const state = ({ auth }) => ({ ...auth })

const actions = (dispatch) => ({
  setAuthForm: (name, value) => dispatch(SetAuthForm(name, value)),
  resetAuth: (value) => dispatch(ResetAuth(value)),
  setCurrentUser: (value) => dispatch(SetCurrentUser(value)),
  toggleAuth: (value) => dispatch(ToggleAuthenticated(value))
})

const Login = ({
  setAuthForm,
  resetAuth,
  setCurrentUser,
  email,
  password,
  toggleAuth
}) => {
  const loginMutation = useMutation(async (data) => {
    const res = await SignIn(data)
    setCurrentUser(res.payload.id)
    return res
  })

  const handleSubmit = () => {
    loginMutation.mutate({ email, password })
    resetAuth()
  }

  const handleChange = (value, e) => {
    setAuthForm(e.target.name, value)
  }

  if (loginMutation.isError) {
    return Alert.error('Login Failed')
  }

  if (loginMutation.isSuccess) {
    Alert.success('Successfully Logged In')
    localStorage.setItem('token', loginMutation.data.token)
    toggleAuth(true)
    return <Redirect to="/dashboard" />
  }

  return (
    <Container style={{ height: '100vh' }}>
      <Navigation />
      <Content style={{ height: '100%' }}>
        <FlexboxGrid
          justify="center"
          align="middle"
          style={{ height: 'inherit' }}
        >
          <FlexboxGrid.Item colspan={12}>
            <Panel bordered header={<h3>Login</h3>}>
              <Form fluid onSubmit={handleSubmit}>
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <Input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={email}
                    placeholder="jane@mail.com"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <Input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    value={password}
                    placeholder="••••••"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button
                      type="submit"
                      loading={loginMutation.isLoading}
                      appearance="primary"
                      disabled={!email || !password}
                    >
                      Login
                    </Button>
                    <Button appearance="link">Forgot Password?</Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <Footer />
    </Container>
  )
}

export default connect(state, actions)(Login)
