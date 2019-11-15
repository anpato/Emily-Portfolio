import React, { Component } from 'react'
import { Spinner } from '../../../components/common'
import { Redirect } from 'react-router-dom'
import { getProjects, deleteProject } from '../../../services/ApiServices'
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      loading: false,
      modal: false,
      confirm: false,
      message: ''
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    await this.fetchProjects()
  }

  fetchProjects = async () => {
    try {
      const projects = await getProjects()
      this.setState({ projects, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  renderMessage = (id, index) => {
    this.setState({
      modal: true,
      message: 'Are you sure you want to delete this project?'
    })
    if (this.state.confirm) {
      this.removeProject(id, index)
    }
  }

  removeProject = async (id, index) => {
    try {
      const projects = this.state.projects
      this.state.projects.splice(index, 1)
      this.setState({ projects })
      await deleteProject(id)
    } catch (error) {
      throw error
    }
  }

  renderProjects = () => {
    if (this.state.projects.length) {
      return this.state.projects.map((project, index) => {
        return (
          <div key={project._id} className="card">
            <img src={project.images[0]} alt={project.title} />
            <h3>{project.title}</h3>
            <div className="buttons">
              <button
                onClick={() =>
                  this.props.history.push(
                    `/admin/edit/project/${project._id}`,
                    {
                      id: project._id
                    }
                  )
                }
              >
                Edit
              </button>
              <button onClick={() => this.renderMessage(project._id, index)}>
                Delete
              </button>
            </div>
            {this.state.modal ? (
              <div className="modal">
                <p>{this.state.message}</p>
                <div className="buttons delete-buttons">
                  <button
                    onClick={() => this.removeProject(project._id, index)}
                  >
                    Yes
                  </button>
                  <button onClick={() => this.setState({ modal: false })}>
                    No
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )
      })
    }
    if (this.state.loading) {
      return <Spinner color="#90caf9" />
    }
  }

  render() {
    const token = localStorage.getItem('token')
    if (!token) {
      return <Redirect to="/admin/login" />
    }
    return <div className="dashboard">{this.renderProjects()}</div>
  }
}
export { Dashboard }
