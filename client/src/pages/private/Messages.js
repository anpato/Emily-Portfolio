import { useMutation, useQuery } from 'react-query'
import {
  Loader,
  Panel,
  Table,
  Checkbox,
  Button,
  IconButton,
  Icon,
  ButtonToolbar,
  ButtonGroup,
  Whisper,
  Tooltip,
  Divider
} from 'rsuite'
import { useHistory } from 'react-router-dom'
import { GetMessages } from '../../services/messages'
import { connect } from 'react-redux'
import {
  ChangeLimit,
  ChangePage,
  SetMesasgeView,
  SetMessages
} from '../../store/actions'

const state = ({ messages }) => ({ ...messages })
const actions = (dispatch) => ({
  getMessages: (value) => dispatch(SetMessages(value)),
  setMessage: (value) => dispatch(SetMesasgeView(value)),
  changePage: (value) => dispatch(ChangePage(value)),
  changeLimit: (value) => dispatch(ChangeLimit(value))
})
const Messages = ({
  messages,
  totalMessages,
  currentPage,
  limit,
  getMessages,
  setMessage,
  changePage,
  changeLimit,
  totalPages
}) => {
  const history = useHistory()
  const { isLoading } = useQuery('get/messages', async () => {
    const res = await GetMessages(currentPage, limit)
    getMessages(res)
  })

  const mutation = useMutation(async ({ currentPage, limit }) => {
    changeLimit(limit)
    changePage(currentPage)
    const res = await GetMessages(currentPage, limit)
    getMessages(res)
  })

  const handleChangePage = (data) => {
    mutation.mutate({ limit, currentPage: data })
  }

  const handleChangeLength = (data) => {
    mutation.mutate({ limit: data, currentPage })
  }

  if (isLoading) {
    return <Loader center backdrop size="lg" />
  }
  return (
    <Panel>
      <ButtonToolbar>
        <ButtonGroup>
          <IconButton icon={<Icon icon="trash" />} />
        </ButtonGroup>
      </ButtonToolbar>
      <Divider />
      <Table
        // onRowClick={(rData) => history.push(`/dashboard/messages/${rData.id}`)}
        rowHeight={50}
        hover
        data={messages}
        autoHeight
      >
        <Table.Column width={50} verticalAlign="middle">
          <Table.HeaderCell>
            <Checkbox />
          </Table.HeaderCell>
          <Table.Cell dataKey="unread">
            <Checkbox />
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} verticalAlign="middle">
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.Cell dataKey="senderName" />
        </Table.Column>
        <Table.Column flexGrow={1} verticalAlign="middle">
          <Table.HeaderCell>Message</Table.HeaderCell>
          <Table.Cell dataKey="message">
            {(data) => `${data.message}...`}
          </Table.Cell>
        </Table.Column>
        <Table.Column flexGrow={1} verticalAlign="middle">
          <Table.HeaderCell>Recieved</Table.HeaderCell>
          <Table.Cell dataKey="createdAt">
            {(data) => new Date(data.createdAt).toDateString()}
          </Table.Cell>
        </Table.Column>
      </Table>
      <Table.Pagination
        next={currentPage !== totalPages}
        lengthMenu={[
          { value: 10, label: 10 },
          { value: 20, label: 20 },
          { value: 30, label: 30 }
        ]}
        activePage={currentPage}
        maxButtons={totalPages}
        displayLength={limit}
        total={totalMessages}
        onChangePage={handleChangePage}
        onChangeLength={handleChangeLength}
      />
    </Panel>
  )
}

export default connect(state, actions)(Messages)
