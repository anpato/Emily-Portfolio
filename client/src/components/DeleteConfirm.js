import { Modal, Button, Icon } from 'rsuite'

const DeleteConfirm = ({ ui, toggleDelete, handleRemove }) => {
  return (
    <Modal
      size="xs"
      show={ui.toggleDelete}
      backdrop="static"
      onHide={() => toggleDelete(false)}
    >
      <Modal.Header>
        <Modal.Title>Are you sure you want to delete this project?</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <Icon
          icon="remind"
          style={{
            color: '#ffb300',
            fontSize: 24
          }}
        />{' '}
        Once a project is deleted, you will not be able to retrieve it.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleRemove} appearance="primary" color="red">
          Yes
        </Button>
        <Button appearance="primary" onClick={() => toggleDelete(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirm
