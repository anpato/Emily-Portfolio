import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import ProjectForm from './ProjectForm'

const state = ({ adminProjects }) => ({ ...adminProjects })

const UpdateForm = ({ selectedProject }) => {
  if (!selectedProject) {
    return <Redirect to="/dashboard" />
  }
  return <ProjectForm />
}

export default connect(state)(UpdateForm)
