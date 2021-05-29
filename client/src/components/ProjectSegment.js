import { Panel } from 'rsuite'
import { Grid } from 'semantic-ui-react'
const ProjectSegment = ({ projects }) => {
  const toggleGridPos = (proj, i) => {
    if (i % 2 === 0) {
      return (
        <Grid columns={2} divided padded relaxed>
          <Grid.Column verticalAlign="middle" textAlign="center">
            <img
              style={{ width: '100%', objectFit: 'cover' }}
              src={proj.assets[0].metadata.src || ''}
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="center">
            <h2>{proj.title}</h2>
          </Grid.Column>
        </Grid>
      )
    }
    return (
      <Grid columns={2} divided padded relaxed>
        <Grid.Column verticalAlign="middle" textAlign="center">
          <h2>{proj.title}</h2>
        </Grid.Column>
        <Grid.Column verticalAlign="middle" textAlign="center">
          <img
            style={{ width: '100%', objectFit: 'cover' }}
            src={proj.assets[0].metadata.src || ''}
          />
        </Grid.Column>
      </Grid>
    )
  }
  return projects.map((proj, i) => (
    <Panel
      className="project-segment"
      bordered
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
  ))
}
export default ProjectSegment
