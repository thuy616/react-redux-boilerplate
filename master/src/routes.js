import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import App from './components/main';
import TourList from './containers/tour/tours';
import Signin from './components/Auth/Signin';
import Base from './components/Layout/Base';
import GuidesContainer from './containers/guide/guides'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        {/* Default route*/}
        <Route path="signin" component={Signin} />
        <Route path="tours" component={TourList} >
          // <IndexRoute component={TourList} />
        </Route>
        <Route path="guides" component={GuidesContainer} />

    </Route>
  </Router>
);
