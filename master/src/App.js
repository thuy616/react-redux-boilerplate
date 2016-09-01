import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import routes from './routes';

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}>
    </Router>
  </Provider>
  , document.getElementById('app'));
