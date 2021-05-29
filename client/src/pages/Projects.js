import { connect } from 'react-redux'
import { useQuery } from 'react-query'
import { GetProjectData } from '../services/projects'
import { setProjects } from '../store/actions'
import { Divider, Loader } from 'rsuite'

import { Container } from 'semantic-ui-react'
import { Suspense } from 'react'
import PanelPlaceholder from '../components/PanelPlaceholder'
import ProjectSegment from '../components/ProjectSegment'
import 'semantic-ui-css/semantic.min.css'
const state = (state) => ({ ...state.projects })
const actions = (dispatch) => ({
  getProjects: (data) => dispatch(setProjects(data))
})
const Projects = ({ projects, getProjects }) => {
  const { isLoading, isLoadingError, data, isSuccess } = useQuery(
    'projects',
    async () => {
      let res = await GetProjectData()
      getProjects(res)
    }
  )
  if (isLoading) {
    return (
      <div>
        <Loader size="lg" center backdrop />
      </div>
    )
  }

  return (
    <Container fluid style={{ padding: '1em', marginTop: '1em' }}>
      <h3 style={{ textAlign: 'center' }}>Gallery</h3>

      <Divider />

      <Suspense fallback={<PanelPlaceholder />}>
        <ProjectSegment projects={projects} />
      </Suspense>
    </Container>
  )
}

export default connect(state, actions)(Projects)
