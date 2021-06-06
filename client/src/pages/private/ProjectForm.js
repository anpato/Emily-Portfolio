import { connect } from 'react-redux'
import {
  Button,
  Icon,
  Input,
  Panel,
  Uploader,
  Notification,
  List,
  Alert
} from 'rsuite'
import {
  AppendProject,
  PreloadForm,
  SetUploadForm,
  SwapUpdate,
  UpdateFileList
} from '../../store/actions'
import { Redirect, useParams } from 'react-router-dom'
import path from 'path'
import { allowedExts } from '../../utils'
import { useMutation } from 'react-query'
import { useEffect } from 'react'
import { UpdateProject, UploadProject } from '../../services/projects'
const state = ({ upload, adminProjects }) => ({
  ...upload,
  selectedProject: adminProjects.selectedProject
})

const actions = (dispatch) => ({
  setForm: (name, value) => dispatch(SetUploadForm(name, value)),
  updateFileList: (files) => dispatch(UpdateFileList(files)),
  preloadForm: (payload) => dispatch(PreloadForm(payload)),
  swapUpdate: (data) => dispatch(SwapUpdate(data)),
  appendProject: (data) => dispatch(AppendProject(data))
})

const ProjectForm = ({
  setForm,
  updateFileList,
  files,
  title,
  description,
  isEdit,
  selectedProject,
  preloadForm,
  swapUpdate,
  appendProject
}) => {
  const mutation = useMutation(async (data) => {
    const res = await UpdateProject(data.formData, data.id)
    swapUpdate(res)
    return
  })

  const uploadMutation = useMutation(async (data) => {
    const res = await UploadProject(data)
    appendProject(res)
    return
  })
  const { project_id } = useParams()
  useEffect(() => {
    if (isEdit) {
      preloadForm({
        title: selectedProject.title,
        description: selectedProject.description,
        files: selectedProject.assets.map((img) => ({
          name: img.fileName,
          fileKey: img.id,
          url: img.metadata.src
        }))
      })
    }
    return () => {
      preloadForm()
    }
  }, [])
  const handleChange = (value, { target }) => {
    setForm(target.name, value)
  }

  const handleEdit = () => {
    const formData = new FormData()
    formData.append('description', description)
    formData.append('title', title)
    files.forEach((f) => {
      if (f.blobFile) {
        formData.append('uploads', new File([f.blobFile], f.name))
      } else {
        formData.append('assets', JSON.stringify(f))
      }
    })
    mutation.mutateAsync({ formData, id: project_id })
    if (mutation.isError) {
      return Alert.error('Upload Failed')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEdit) {
      return handleEdit()
    }
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    files.forEach((f) =>
      formData.append('uploads', new File([f.blobFile], f.name))
    )
    uploadMutation.mutate(formData)
    if (uploadMutation.isError) {
      return Alert.error('Upload Failed')
    }
  }

  const checkFile = (file) => {
    let filePath = path.extname(file[0].name)
    let reason = ''
    if (!allowedExts.includes(filePath)) {
      reason = 'Invalid File Type'
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
  if (mutation.isSuccess || uploadMutation.isSuccess) {
    Alert.success('Project Uploaded!')
    return <Redirect to="/dashboard" />
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
          defaultFileList={files}
          listType="picture-text"
          shouldQueueUpdate={(_, file) => checkFile(file)}
          multiple
          autoUpload={false}
          maxPreviewFileSize={9242880}
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
          loading={mutation.isLoading}
          disabled={!title || !description}
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
