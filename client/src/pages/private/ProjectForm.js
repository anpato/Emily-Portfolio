import { connect } from 'react-redux'
import {
  Button,
  Icon,
  Input,
  Panel,
  Uploader,
  Notification,
  List
} from 'rsuite'
import { SetUploadForm, UpdateFileList } from '../../store/actions'
import path from 'path'
import { allowedExts } from '../../utils'
const state = ({ upload }) => ({ ...upload })

const actions = (dispatch) => ({
  setForm: (name, value) => dispatch(SetUploadForm(name, value)),
  updateFileList: (files) => dispatch(UpdateFileList(files))
})

const ProjectForm = ({
  setForm,
  updateFileList,
  files,
  title,
  description
}) => {
  const handleChange = (value, { target }) => {
    setForm(target.name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let fileList = files.map((f) => new File([f.blobFile], f.name))
    console.log(fileList)
  }

  const checkFile = (file) => {
    let filePath = path.extname(file[0].name)
    let reason = ''
    if (!allowedExts.includes(filePath)) {
      Notification.error({
        duration: 8500,
        title: reason,
        description: (
          <div>
            <p> Check the following list for accepted file types.</p>
            <List bordered>
              {allowedExts.map((e) => (
                <List.Item key={e}>{e}</List.Item>
              ))}
            </List>
          </div>
        )
      })
      return false
    }
    if (files.find((f) => f.name === file[0].name)) {
      Notification.error({
        duration: 8500,
        title: reason,
        description: <p>Duplicate File</p>
      })
      return false
    }

    return true
  }

  return (
    <Panel bordered className="upload-center">
      <form className="upload-form" onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={title}
        />
        <Input
          componentClass="textarea"
          placeholder="Description"
          name="description"
          onChange={handleChange}
          value={description}
        />
        <Uploader
          className={files.length ? 'uploader' : null}
          fileList={files}
          listType="picture-text"
          shouldQueueUpdate={(_, file) => checkFile(file)}
          multiple
          autoUpload={false}
          draggable
          accept="image/*,video/*"
          onError={(error) => console.log(error)}
          onChange={updateFileList}
        >
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Icon style={{ lineHeight: '100px' }} icon="upload2" size="3x" />
            <p style={{ lineHeight: '100px' }}>Drag or Click to add files.</p>
          </div>
        </Uploader>
        <Button
          disabled={!title || !description || !files.length}
          type="submit"
          appearance="primary"
        >
          Upload
        </Button>
      </form>
    </Panel>
  )
}
export default connect(state, actions)(ProjectForm)
