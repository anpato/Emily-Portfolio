import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { Panel, Animation, Divider, Loader, Alert } from 'rsuite'
import { Grid } from 'semantic-ui-react'
import ButtonToolBar from '../../components/ButtonToolbar'
import DeleteConfirm from '../../components/DeleteConfirm'
import { GetProjectById } from '../../services/projects'
import {
  RemoveProject,
  SelectProjectPreview,
  TargetAdminDisplay,
  ToggleDelete,
  ToggleEdit
} from '../../store/actions'
const state = ({ adminProjects, ui }) => ({ ...adminProjects, ui })

const actions = (dispatch) => ({
  targetDisplayItem: (data) => dispatch(TargetAdminDisplay(data)),
  selectProject: (data) => dispatch(SelectProjectPreview(data)),
  toggleDelete: (value) => dispatch(ToggleDelete(value)),
  removeProject: (id) => dispatch(RemoveProject(id)),
  toggleEdit: (value) => dispatch(ToggleEdit(value))
})

const ViewProject = ({
  selectedProject,
  targetItem,
  targetDisplayItem,
  selectProject,
  toggleDelete,
  ui,
  removeProject,
  toggleEdit
}) => {
  const { project_id } = useParams()
  const history = useHistory()
  const { isLoading } = useQuery('getproject-details', async () => {
    const res = await GetProjectById(project_id)
    selectProject(res)
  })
  const { Collapse } = Animation

  const handleRemove = () => {
    removeProject(project_id)
    Alert.config({ duration: 4000 })
    Alert.info('Project Successfully Removed')
    toggleDelete(false)
    history.push('/dashboard')
  }

  const handleNavigateEdit = () => {
    toggleEdit(true)
    history.push(`/dashboard/update/${project_id}`)
  }

  useEffect(() => {
    return () => {
      targetDisplayItem(null)
    }
  }, [project_id])
  if (isLoading) {
    return <Loader center backdrop size="lg" />
  }
  return (
    <Panel bordered style={{ width: '90%', margin: '1em auto' }}>
      <DeleteConfirm
        ui={ui}
        toggleDelete={toggleDelete}
        handleRemove={handleRemove}
      />
      <div className="row">
        <div>
          <h4>{selectedProject.title}</h4>
          <p>{selectedProject.description}</p>
        </div>
        <div>
          <ButtonToolBar
            toggleDelete={toggleDelete}
            navigateEdit={handleNavigateEdit}
          />
        </div>
      </div>
      <Divider />
      <Grid columns={3} stackable padded>
        {selectedProject.assets.map((asset) => (
          <Grid.Column key={asset.id} stretched>
            <div
              style={
                targetItem && asset.id === targetItem.id
                  ? { border: '2px solid rgba(0,0,0,0.6)' }
                  : { border: '2px solid rgba(255,255,255,0.4)' }
              }
            >
              {asset.metadata.metaType === 'image' ? (
                <img
                  onClick={() => targetDisplayItem(asset)}
                  src={asset.metadata.src}
                  alt=""
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              ) : (
                <video
                  onClick={() => targetDisplayItem(asset)}
                  src={asset.metadata.src}
                  autoPlay
                  controls={false}
                />
              )}
            </div>
          </Grid.Column>
        ))}
      </Grid>

      <Collapse in={!!targetItem}>
        <div className="display-wrapper">
          <Divider />
          {targetItem && targetItem.metadata.metaType === 'image' ? (
            <img
              alt="preview"
              src={targetItem.metadata.src}
              style={{ width: '100%' }}
            />
          ) : null}
        </div>
      </Collapse>
    </Panel>
  )
}

export default connect(state, actions)(ViewProject)
