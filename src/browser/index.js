import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
)

// we use hydrate instead of render because it tells react we already
// created the markup on the server and instead of recreating on the client
// just preserve it and attach any event handlers we need
