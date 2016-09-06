import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';
import routes from './routes';
import configureStore from "./store.js";
import { syncHistoryWithStore } from 'react-router-redux';
import RadiumContainer from "./containers/RadiumContainer";

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

const store = configureStore(window.__INITIAL_STATE__);
delete window.__INITIAL_STATE__;
const history = syncHistoryWithStore(browserHistory, store)

const reactRoot = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <RadiumContainer>
      <Router history={history} routes={routes}>
      </Router>
    </RadiumContainer>
  </Provider>,
  reactRoot
);

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if(process.env.NODE_ENV === "production"){
	if (!reactRoot.firstChild || !reactRoot.firstChild.attributes ||
  	!reactRoot.firstChild.attributes["data-react-checksum"]) {
		console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	}
}
