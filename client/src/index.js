import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import 'rsuite/dist/styles/rsuite-default.css'
import store from './store'

const queryClient = new QueryClient()

ReactDOM.render(
  // <BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  // </BrowserRouter>,
  document.getElementById('root')
)
