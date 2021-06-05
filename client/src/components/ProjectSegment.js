import { Divider, Panel } from 'rsuite'
import { Grid } from 'semantic-ui-react'
const ProjectSegment = ({ projects, selectProject }) => {
  const toggleGridPos = (proj) => {
    return (
      <Grid columns={1} stackable padded relaxed>
        <Grid.Column verticalAlign="middle" textAlign="center">
          <img
            style={{ width: '100%', objectFit: 'cover' }}
            src={proj.assets.length ? proj.assets[0].metadata.src : ''}
            alt=""
          />
        </Grid.Column>
        <Grid.Column verticalAlign="middle" textAlign="center">
          <h5>{proj.title}</h5>
          <Divider />
        </Grid.Column>
      </Grid>
    )
  }
  return projects.map((proj, i) => (
    <Grid.Column
      key={proj.id}
      stretched
      widescreen={5}
      largeScreen={5}
      tablet={8}
    >
      <Panel
        className="project-segment"
        bordered
        onClick={() => selectProject(proj)}
        style={{
          position: 'relative',
          cursor: 'pointer',
          minHeight: 200,
          margin: '1em'
        }}
        shaded
      >
        {toggleGridPos(proj, i)}
      </Panel>
    </Grid.Column>
  ))
}
export default ProjectSegment
