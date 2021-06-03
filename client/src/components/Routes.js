import { Content, Loader } from 'rsuite'
import { Route, Switch } from 'react-router-dom'
import Public from '../pages/public/Public'
import ProtectedRoute from './ProtectedRoute'
import Private from '../pages/Private'
import { useQuery } from 'react-query'

const Routes = () => {
  const token = localStorage.getItem('token')
  const { isLoading } = useQuery('fetch-admin', async () => {})
  if (isLoading) {
    return <Loader backdrop size="lg" center />
  }
  return (
    <Content>
      <div style={{ maxWidth: '100%' }}>
        <Switch>
          <Route exact path="/" component={Public} />
          <Route path="/login" />
          <ProtectedRoute exact path="/dashboard" component={Private} />
        </Switch>
      </div>
    </Content>
  )
}

export default Routes
