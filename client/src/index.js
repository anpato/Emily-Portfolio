import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query'
import { Provider } from 'react-redux'
import 'rsuite/dist/styles/rsuite-default.css'
import store from './store'

const cache = new QueryCache()
const queryClient = new QueryClient({ queryCache: cache })
const queryConfig = {
  retry: 0,
  staleTime: 60000
}
ReactDOM.render(
  <QueryClientProvider client={queryClient} config={queryConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
)
