import React from 'react'
import { Route } from 'react-router-dom'
import { Dashboard, Login, Upload, EditProject } from '../../Private'

export const Private = ({ match, token }) => {
  return (
    <div className="main">
      <main>
        <Route
          exact
          path="/admin/dashboard"
          render={props => <Dashboard {...props} token={token} />}
        />
        <Route
          exact
          path={`/admin/login`}
          render={props => <Login {...props} token={token} />}
        />
        <Route
          exact
          path={`${match.url}/upload`}
          render={props => <Upload {...props} />}
        />
        <Route
          exact
          path={`${match.url}/edit/project/:project_id`}
          render={props => <EditProject {...props} />}
        />
      </main>
    </div>
  )
}
