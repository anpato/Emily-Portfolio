import { useQuery } from 'react-query'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Animation, Button, Content, Divider, Loader } from 'rsuite'
import { Grid } from 'semantic-ui-react'
import ProjectSegment from '../../components/ProjectSegment'
import { GetProjectData } from '../../services/projects'
import { GetDashProjects, SelectProjectPreview } from '../../store/actions'

const state = ({ adminProjects }) => ({
  adminProjects
})

const actions = (dispatch) => ({
  setProjects: (data) => dispatch(GetDashProjects(data)),
  selectProject: (data) => dispatch(SelectProjectPreview(data))
})

const ProjectManagement = ({ adminProjects, setProjects, selectProject }) => {
  const history = useHistory()
  const { isLoading } = useQuery('get/projects', async () => {
    const res = await GetProjectData()
    setProjects(res)
  })
  if (isLoading) {
  }

  const targetProject = (data) => {
    selectProject(data)
    history.push(`/dashboard/project/view/${data.id}`)
  }

  return (
    <Content>
      <section className="container-wrapper">
        <div className="header-wrapper">
          <h3 style={{ textAlign: 'left' }}>Current Projects</h3>
          <Button
            appearance="ghost"
            onClick={() => history.push('/dashboard/project/new')}
          >
            New Project
          </Button>
        </div>
        <Divider />
        {isLoading ? <Loader backdrop center size="lg" /> : null}
        <Grid columns={3}>
          <Animation.Collapse in={!!adminProjects.projects.length}>
            <ProjectSegment
              projects={adminProjects.projects}
              selectProject={targetProject}
            />
          </Animation.Collapse>
        </Grid>
      </section>
    </Content>
  )
}

export default connect(state, actions)(ProjectManagement)
