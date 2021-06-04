import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import './styles/overrides.less'
const cache = new QueryCache()
const queryClient = new QueryClient({
  queryCache: cache,
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false
    }
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
