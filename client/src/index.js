import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query'
import { Provider } from 'react-redux'
import 'rsuite/dist/styles/rsuite-default.css'
import store from './store'
import { BrowserRouter } from 'react-router-dom'

const cache = new QueryCache()
const queryClient = new QueryClient({
  queryCache: cache,
  defaultOptions: {
    staleTime: Infinity
  }
})

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
