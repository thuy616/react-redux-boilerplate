import React from 'react';
import { Router, browserHistory, Route, IndexRoute} from 'react-router';
import RequireAuth from './components/Auth/require_auth';
import NotFound from './components/404';
import BasePage from './components/main';
import Tours from './containers/Tour/Tours';
import Signin from './components/Auth/Signin';
import Base from './components/Layout/Base';
import Guides from './containers/Guide/Guides'

export default (
  <Router history={browserHistory}>
    <Route path="/" component={BasePage}>
        {/* Default route*/}
        <Route path="signin" component={Signin} />
        <Route path="tours" component={RequireAuth(Base)} >
          <IndexRoute component={Tours} />
        </Route>
        <Route path="guides" component={Guides} />
        <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
