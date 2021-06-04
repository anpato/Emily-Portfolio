import { ButtonGroup, IconButton, Icon, Tooltip, Whisper } from 'rsuite'

const ButtonToolBar = ({ toggleDelete, navigateEdit }) => {
  return (
    <ButtonGroup vertical>
      <Whisper speaker={<Tooltip>Edit</Tooltip>}>
        <IconButton
          onClick={navigateEdit}
          appearance="primary"
          icon={<Icon icon="edit" />}
        />
      </Whisper>
      <Whisper speaker={<Tooltip>Delete</Tooltip>}>
        <IconButton
          onClick={() => toggleDelete(true)}
          color="red"
          icon={<Icon icon="trash" />}
        />
      </Whisper>
    </ButtonGroup>
  )
}
export default ButtonToolBar
