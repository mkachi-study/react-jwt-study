import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch } from 'react-router-dom'
import router from './router'
import * as serviceWorker from './serviceWorker'

import { withCookies, CookiesProvider } from 'react-cookie'

import './index.css'

const App: React.FC = withCookies(() => {
  return (
    <CookiesProvider>
      <Router>
        <Switch>{router()}</Switch>
      </Router>
    </CookiesProvider>
  )
})

ReactDOM.render(<App />, document.getElementById('root'))

// scripts/config.js -> usePWA: true
// serviceWorker.register()
serviceWorker.unregister()
