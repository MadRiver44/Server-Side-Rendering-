import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from '../shared/App'
import routes from '../shared/routes'

const app = express()

app.use(cors())
app.use(express.static('public'))

// have a get request, find the route that matches the request
app.get('*', (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {}

  // if the active route has any data on it then we fetch it, if not, then
  // Promise.resolve
  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise
    .then(data => {
      const context = { data }

      // location prop is the current location requested by user, context obj can contain any
      // information about the render

      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>,
      )

      // when we use server side rendering, the app will get its initioal data from the server and then the broswser.
      // window.__INITIAL_DATA__ is where we will attach this initial data to.
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
    })
    .catch(next)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})
