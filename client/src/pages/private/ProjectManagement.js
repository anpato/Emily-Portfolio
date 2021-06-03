import { useQuery } from 'react-query'
import { connect } from 'react-redux'
import { Animation, Button, Content, Divider, Loader } from 'rsuite'
import { Grid } from 'semantic-ui-react'
import ProjectSegment from '../../components/ProjectSegment'
import { GetProjectData } from '../../services/projects'
import { SetProjects } from '../../store/actions'

const state = ({ projects }) => ({ ...projects })

const actions = (dispatch) => ({
  setProjects: (data) => dispatch(SetProjects(data))
})

const ProjectManagement = ({ projects, setProjects }) => {
  const { isLoading } = useQuery('get/projects', async () => {
    const res = await GetProjectData()
    setProjects(res)
  })
  if (isLoading) {
  }
  return (
    <Content>
      <section className="container-wrapper">
        <div className="header-wrapper">
          <h3 style={{ textAlign: 'left' }}>Current Projects</h3>
          <Button>New Project</Button>
        </div>
        <Divider />
        {isLoading ? <Loader backdrop center size="lg" /> : null}
        <Grid columns={3}>
          <Animation.Collapse in={!!projects.length}>
            <ProjectSegment projects={projects} />
          </Animation.Collapse>
        </Grid>
      </section>
    </Content>
  )
}

export default connect(state, actions)(ProjectManagement)
