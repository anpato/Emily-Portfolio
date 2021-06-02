import { connect } from 'react-redux'
import { useQuery } from 'react-query'
import { GetProjectData } from '../services/projects'
import { SelectProject, SetProjects, TargetDisplayItem } from '../store/actions'
import { Loader } from 'rsuite'
import { Container, Grid } from 'semantic-ui-react'
import React, { Suspense } from 'react'
import PanelPlaceholder from '../components/PanelPlaceholder'
import ProjectSegment from '../components/ProjectSegment'
import 'semantic-ui-css/semantic.min.css'
import AssetView from '../components/AssetView'

const state = (state) => ({ ...state.projects })
const actions = (dispatch) => ({
  getProjects: (data) => dispatch(SetProjects(data)),
  selectProject: (data) => dispatch(SelectProject(data)),
  targetDisplayItem: (data) => dispatch(TargetDisplayItem(data))
})

const Projects = React.forwardRef(
  (
    {
      projects,
      getProjects,
      selectProject,
      currentProjectView,
      targetItem,
      targetDisplayItem
    },
    ref
  ) => {
    const { isLoading } = useQuery('projects', async () => {
      let res = await GetProjectData()
      getProjects(res)
    })
    if (isLoading) {
      return (
        <div>
          <Loader size="lg" center backdrop />
        </div>
      )
    }

    return (
      <Container fluid style={{ padding: '1em', marginTop: '1em' }}>
        <div ref={ref}>
          <Suspense fallback={<PanelPlaceholder />}>
            <Grid columns={3} padded relaxed stackable>
              <ProjectSegment
                projects={projects}
                selectProject={selectProject}
              />
            </Grid>
          </Suspense>
          {currentProjectView && (
            <AssetView
              currentProjectView={currentProjectView}
              targetItem={targetItem}
              targetDisplayItem={targetDisplayItem}
              selectProject={selectProject}
            />
          )}
        </div>
      </Container>
    )
  }
)

export default connect(state, actions, null, { forwardRef: true })(Projects)
