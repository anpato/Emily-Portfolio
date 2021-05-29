import { Content } from 'rsuite'
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Projects'

const Routes = () => {
  return (
    <Content>
      <div style={{ maxWidth: '100%' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Projects} />
        </Switch>
      </div>
    </Content>
  )
}

export default Routes
