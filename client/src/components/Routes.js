import { Content, Loader } from 'rsuite'
import { Route, Switch } from 'react-router-dom'
import Public from '../pages/Public'
import ProtectedRoute from './ProtectedRoute'
import Private from '../pages/Private'
import { useQuery } from 'react-query'
import ProjectForm from '../pages/private/ProjectForm'
import ViewProject from '../pages/private/ViewProject'
import ProjectManagement from '../pages/private/ProjectManagement'
import UpdateForm from '../pages/private/UpdateForm'

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
          <ProtectedRoute
            exact
            path="/dashboard"
            token={1}
            user={1}
            component={() => (
              <Private>
                <ProjectManagement />
              </Private>
            )}
          />
          <ProtectedRoute
            exact
            path="/dashboard/project/new"
            token={1}
            user={1}
            render={() => (
              <Private>
                <ProjectForm />
              </Private>
            )}
          />
          <ProtectedRoute
            exact
            path="/dashboard/project/view/:project_id"
            token={1}
            user={1}
            component={() => (
              <Private>
                <ViewProject />
              </Private>
            )}
          />
          <ProtectedRoute
            exact
            path="/dashboard/update/:project_id"
            token={1}
            user={1}
            component={() => (
              <Private>
                <UpdateForm />
              </Private>
            )}
          />
        </Switch>
      </div>
    </Content>
  )
}

export default Routes
