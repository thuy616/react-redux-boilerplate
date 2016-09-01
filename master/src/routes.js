import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import App from './components/main';
import TourList from './containers/Tour/TourList';
import Signin from './components/Auth/Signin';
import Base from './components/Layout/Base';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        {/* Default route*/}
        <Route path="signin" component={Signin} />
        <Route path="tours" component={Base} >
          <IndexRoute component={TourList} />
        </Route>
    </Route>


  </Router>
);
