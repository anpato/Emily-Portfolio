import { connect } from 'react-redux'
import { Suspense } from 'react'
import { useQuery } from 'react-query'
import { GetProjectData } from '../services/projects'
import { setProjects } from '../store/actions'
import { Loader, Panel, Grid, Col, Tooltip, Whisper, Row } from 'rsuite'
import PanelPlaceholder from '../components/PanelPlaceholder'
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
    <Grid fluid style={{ padding: '2em' }}>
      <Row gutter={10}>
        {projects.map((proj) => (
          <Col key={proj.id} xs={32} sm={24} md={6} lg={4}>
            <Suspense fallback={<PanelPlaceholder />}>
              <Whisper
                trigger="hover"
                placement="bottom"
                speaker={<Tooltip>{proj.title}</Tooltip>}
              >
                <Panel
                  bordered
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    minHeight: 200
                  }}
                  shaded
                >
                  <img
                    style={{ width: '100%', objectFit: 'cover' }}
                    src={proj.assets[0].metadata.src || ''}
                  />
                </Panel>
              </Whisper>
            </Suspense>
          </Col>
        ))}
      </Row>
    </Grid>
  )
}

export default connect(state, actions)(Projects)
