import Home from './pages/Home/Home';
import NotFoundPage from './pages/NotFoundPage';
import { fetchCompleteData } from './actions/spacexAction';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: fetchCompleteData()
  },
  {
    component: NotFoundPage
  }
]

export default Routes;

