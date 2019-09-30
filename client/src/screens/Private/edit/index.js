import React, { Component } from 'react'
import { Spinner } from '../../../components/common'
import { getProject, updateProject } from '../../../services/ApiServices'
import { uploadFile } from 'react-s3'
import { AwsConfig } from '../../../services/config/AwsConfig'
import { runInThisContext } from 'vm'

class EditProject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			carousel: false,
			image_urls: [],
			uploading: false,
			images: [],
			isSubmit: false,
			loading: false
		}
	}

	async componentDidMount() {
		this.setState({ loading: true })
		await this.fetchProject()
	}

	fetchProject = async () => {
		try {
			const project = await getProject(this.props.location.state.id)
			this.setState({
				title: project.title,
				description: project.description,
				carousel: project.carousel,
				image_urls: project.images,
				images: project.images,
				loading: false
			})
		} catch (error) {}
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleCarousel = () => {
		this.setState({ carousel: !this.state.carousel })
	}

	handleImageUpload = (file) => {
		this.setState({
			uploading: true
		})
		uploadFile(file[0], AwsConfig).then((image) => {
			this.setState({
				images: [...this.state.images, image.location],
				uploading: false
			})
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		try {
			this.setState({ loading: true })

			const { title, description, images, carousel } = this.state
			const data = {
				title,
				description,
				images,
				carousel
			}
			const resp = await updateProject(this.props.location.state.id, data)
			if (resp === 200) {
				this.props.history.push('/admin/dashboard')
			}
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
		if (this.state.image_urls.length > 0) {
			return this.state.image_urls.map((image, index) => {
				return (
					<div key={index} className='input'>
						<input
							type='file'
							value={this.state.image_url}
							onChange={({ target: { files } }) =>
								this.handleImageUpload(files)
							}
						/>
						<button onClick={() => this.handleImages(index)}>-</button>
						{this.state.images[index + 1] ? (
							<img src={this.state.images[index + 1]} alt='project' />
						) : null}
					</div>
				)
			})
		}
	}

	renderButtonContent = () => {
		if (this.state.loading && !this.state.isSubmit) {
			return <Spinner color='#f8f8f8' />
		}
		if (!this.state.loading && !this.state.isSubmit) {
			return <div>Update</div>
		}
		if (!this.state.loading && this.state.isSubmit) {
			return <div>Uploaded √</div>
		}
	}

	render() {
		const { title, description, uploading } = this.state
		return (
			<div className='upload'>
				<div className='form-container'>
					{this.state.loading ? (
						<Spinner color='#b0bec5' />
					) : (
						<form onSubmit={this.handleSubmit}>
							<div className='input'>
								<input
									name='title'
									value={title}
									onChange={this.handleChange}
									required
								/>
								<label htmlFor='name'>Project Title</label>
							</div>
							<div className='input'>
								<input
									name='description'
									value={description}
									onChange={this.handleChange}
									required
								/>
								<label htmlFor='description'>Project Description</label>
							</div>
							<span>Edit Images</span>
							<div className='input'>
								<input
									name='image_url'
									onChange={({ target: { files } }) =>
										this.handleImageUpload(files)
									}
									type='file'
								/>
								<img src={this.state.images[0]} alt='project' />
							</div>
							{this.renderInputs()}
							{uploading ? <Spinner color='#b0bec5' /> : null}
							<div className='select'>
								<select onChange={this.handleCarousel}>
									<option name='carousel' value={false}>
										No
									</option>
									<option name='carousel' value={true}>
										Yes
									</option>
								</select>
								<label htmlFor='carousel'>
									Would you like to add this project to the homepage carousel?
								</label>
							</div>
							<button type='submit' disabled={this.state.uploading}>
								{this.renderButtonContent()}
							</button>
						</form>
					)}
				</div>
			</div>
		)
	}
}
export { EditProject }
