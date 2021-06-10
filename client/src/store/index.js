import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  ProjectReducer,
  ContactReducer,
  UIReducer,
  UploadReducer,
  AdminProjectReducer,
  AuthReducer,
  MessageReducer
} from './reducers'

export default createStore(
  combineReducers({
    projects: ProjectReducer,
    contact: ContactReducer,
    ui: UIReducer,
    upload: UploadReducer,
    adminProjects: AdminProjectReducer,
    auth: AuthReducer,
    messages: MessageReducer
  }),
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk))
)
