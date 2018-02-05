import Home from './Home'
import Grid from './Grid'
import { fetchPopularRepos } from './api'

// the reason we need a route config is that the server needs to know which data
// to fetch when the user requests a specific path, any data the route needs in the
// route object itself

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop()),
  },
]

export default routes
