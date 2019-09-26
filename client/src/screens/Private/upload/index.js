import React, { Component } from 'react'
import { Spinner } from '../../../components/common'
import { uploadFile } from 'react-s3'
import { AwsConfig } from '../../../services/config/AwsConfig'

class Upload extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			carousel: false,
			image_urls: [],
			images: [],
			isSubmit: false,
			loading: false
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleImageUpload = (file) => {
		this.setState({ image_urls: [...this.state.image_urls, file[0]] })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			this.state.image_urls.forEach((file) =>
				uploadFile(file, AwsConfig).then((image) =>
					this.setState({ images: [...this.state.images, image.location] })
				)
			)

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

	handleImages = (index) => {
		const { image_urls } = this.state
		image_urls.splice(index, 1)
		this.setState({ image_urls })
	}

	renderInputs = () => {
		if (this.state.image_urls.length) {
			return this.state.image_urls.map((image, index) => {
				return (
					<div key={index}>
						<input
							type="file"
							value={this.state.image_url}
							onChange={({ target: { files } }) =>
								this.handleImageUpload(files)
							}
						/>
						<button onClick={() => this.handleImages(index)}>-</button>
					</div>
				)
			})
		}
	}

	renderButtonContent = () => {
		if (this.state.loading && !this.state.isSubmit) {
			return <Spinner color="#f8f8f8" />
		}
		if (!this.state.loading && !this.state.isSubmit) {
			return <div>Upload</div>
		}
		if (!this.state.loading && this.state.isSubmit) {
			return <div>Message Sent √</div>
		}
	}

	render() {
		const { title, description, carousel, image_url, isSubmit } = this.state
		console.log(this.state.images)
		return (
			<div className="upload">
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<div className="input">
							<input
								name="title"
								value={title}
								onChange={this.handleChange}
								required
							/>
							<label htmlFor="name">Project Title</label>
						</div>
						<div className="input">
							<input
								name="description"
								value={description}
								onChange={this.handleChange}
								required
							/>
							<label htmlFor="description">Project Description</label>
						</div>
						<div className="input">
							<input
								name="image_url"
								onChange={({ target: { files } }) =>
									this.handleImageUpload(files)
								}
								type="file"
								required
							/>
							<label htmlFor="description">Project Images</label>
						</div>
						{this.renderInputs()}
						<div className="input">
							<input
								name="carousel"
								value={carousel}
								onChange={this.handleChange}
								type="checkbox"
							/>
							<label htmlFor="description">Project Description</label>
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
export { Upload }
