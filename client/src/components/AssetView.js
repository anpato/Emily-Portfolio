import { Modal, Panel, Animation, Divider } from 'rsuite'
import { Grid } from 'semantic-ui-react'
const AssetView = ({
  targetItem,
  targetDisplayItem,
  currentProjectView,
  selectProject
}) => {
  const { Collapse } = Animation
  return (
    (
      <Modal
        full
        backdrop
        show={!!currentProjectView}
        onHide={() => selectProject(null)}
      >
        <Modal.Header>
          <Modal.Title>{currentProjectView.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ marginBottom: '1em' }}>
            {currentProjectView.description}
          </p>

          <Panel bordered>
            <Grid columns={3} stackable padded>
              {currentProjectView.assets.map((asset) => (
                <Grid.Column key={asset.id}>
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
            <Divider />
            <Collapse in={!!targetItem}>
              <div className="display-wrapper">
                {targetItem && targetItem.metadata.metaType === 'image' ? (
                  <img
                    src={targetItem.metadata.src}
                    style={{ width: '100%' }}
                  />
                ) : null}
              </div>
            </Collapse>
          </Panel>
        </Modal.Body>
      </Modal>
    ) || null
  )
}
export default AssetView
