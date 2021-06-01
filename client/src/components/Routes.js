import { Content } from 'rsuite'
import { Route, Switch } from 'react-router-dom'
import Public from '../pages/Public'

const Routes = () => {
  return (
    <Content>
      <div style={{ maxWidth: '100%' }}>
        <Switch>
          <Route exact path="/" component={Public} />
        </Switch>
      </div>
    </Content>
  )
}

export default Routes
