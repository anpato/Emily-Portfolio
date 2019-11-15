import React, { Component } from 'react'
import { Spinner } from '../../../components/common'
import { loginUser } from '../../../services/ApiServices'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isSubmit: false,
      isError: false,
      loading: false,
      errMessage: ''
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { username, password } = this.state
    this.setState({ loading: true })
    try {
      const login = await loginUser({ username, password })
      if (login.status === 200) {
        console.log(true)
        this.props.history.push('/admin/dashboard', { token: login.token })
      }
    } catch (error) {
      this.setState({
        isError: true,
        loading: false,
        errMessage: 'Invalid Credentials'
      })
    }
  }

  renderButtonContent = () => {
    if (this.state.loading && !this.state.isSubmit) {
      return <Spinner color="#f8f8f8" />
    }
    if (!this.state.loading && !this.state.isSubmit) {
      return <div>Login</div>
    }
    if (!this.state.loading && this.state.isError) {
      return <div>{this.state.errMessage}</div>
    }
  }

  render() {
    const { username, password, isSubmit } = this.state
    if (this.props.token) {
      return <Redirect to="/admin/dashboard" />
    }
    return (
      <div className="login">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="input">
              <input
                name="username"
                value={username}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="name">Username</label>
            </div>
            <div className="input">
              <input
                name="password"
                value={password}
                onChange={this.handleChange}
                type="password"
                required
              />
              <label htmlFor="email">Password</label>
            </div>
            <button type="submit" disabled={isSubmit}>
              {this.renderButtonContent()}
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export { Login }
