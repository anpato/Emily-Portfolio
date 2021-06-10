import { Content } from 'rsuite'
import { Route, Switch } from 'react-router-dom'
import Public from '../pages/Public'
import ProtectedRoute from './ProtectedRoute'
import Private from '../pages/Private'
import ProjectForm from '../pages/private/ProjectForm'
import ViewProject from '../pages/private/ViewProject'
import ProjectManagement from '../pages/private/ProjectManagement'
import UpdateForm from '../pages/private/UpdateForm'
import Login from '../pages/Login'
import Messages from '../pages/private/Messages'

const Routes = ({ currentUser, authenticated }) => {
  return (
    <Content>
      <div style={{ maxWidth: '100%' }}>
        <Switch>
          <Route exact path="/" component={() => <Public />} />
          <Route path="/login" component={Login} />
          <ProtectedRoute
            exact
            currentUser={currentUser}
            isAuthenticated={authenticated}
            path="/dashboard"
            component={() => (
              <Private>
                <ProjectManagement />
              </Private>
            )}
          />
          <ProtectedRoute
            exact
            currentUser={currentUser}
            isAuthenticated={authenticated}
            path="/dashboard/project/new"
            render={() => (
              <Private>
                <ProjectForm />
              </Private>
            )}
          />
          <ProtectedRoute
            exact
            path="/dashboard/project/view/:project_id"
            currentUser={currentUser}
            isAuthenticated={authenticated}
            component={() => (
              <Private>
                <ViewProject />
              </Private>
            )}
          />
          <ProtectedRoute
            exact
            path="/dashboard/update/:project_id"
            currentUser={currentUser}
            isAuthenticated={authenticated}
            component={() => (
              <Private>
                <UpdateForm />
              </Private>
            )}
          />
          <ProtectedRoute
            exact
            path="/dashboard/messages"
            currentUser={currentUser}
            isAuthenticated={authenticated}
            component={() => (
              <Private>
                <Messages />
              </Private>
            )}
          />
        </Switch>
      </div>
    </Content>
  )
}

export default Routes
