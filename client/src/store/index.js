import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  ProjectReducer,
  ContactReducer,
  UIReducer,
  UploadReducer,
  AdminProjectReducer,
  AuthReducer
} from './reducers'
import LogRocket from 'logrocket'
LogRocket.init(process.env.REACT_APP_LOG_ROCKET)

export default createStore(
  combineReducers({
    projects: ProjectReducer,
    contact: ContactReducer,
    ui: UIReducer,
    upload: UploadReducer,
    adminProjects: AdminProjectReducer,
    auth: AuthReducer
  }),
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk, LogRocket.reduxMiddleware())
    : composeWithDevTools(applyMiddleware(thunk))
)
