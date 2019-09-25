import React, { Component } from 'react'
import { Spinner } from '../../../components/common'
class Contact extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			message: '',
			isSubmit: false,
			loading: false
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			this.setState({ loading: true }, () =>
				setTimeout(
					() =>
						this.setState({
							loading: false,
							isSubmit: true,
							name: '',
							email: '',
							message: ''
						}),
					5000
				)
			)
		} catch (error) {
			throw error
		}
	}

	renderButtonContent = () => {
		if (this.state.loading && !this.state.isSubmit) {
			return <Spinner color="#f8f8f8" />
		}
		if (!this.state.loading && !this.state.isSubmit) {
			return <div>Send</div>
		}
		if (!this.state.loading && this.state.isSubmit) {
			return <div>Message Sent √</div>
		}
	}

	render() {
		const { email, name, message, isSubmit } = this.state
		return (
			<div className="contact">
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<div className="input">
							<input
								name="name"
								value={name}
								onChange={this.handleChange}
								required
							/>
							<label htmlFor="name">Name</label>
						</div>
						<div className="input">
							<input
								name="email"
								value={email}
								onChange={this.handleChange}
								required
							/>
							<label htmlFor="email">Email</label>
						</div>
						<div className="input">
							<textarea
								name="message"
								value={message}
								onChange={this.handleChange}
								required
							/>
							<label htmlFor="message">Message</label>
						</div>
						<button type="submit" disabled={isSubmit}>
							{this.renderButtonContent()}
						</button>
					</form>
					<aside>
						<div>
							<h3>Contact</h3>
						</div>
						<div>
							<p>
								{' '}
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</aside>
				</div>
			</div>
		)
	}
}

export { Contact }
