import babelPolyfill from "babel-polyfill";
import {Server} from "hapi";
import h2o2 from "h2o2";
import inert from "inert";
import React from "react";
import ReactDOM from "react-dom/server";
import {RouterContext, match} from "react-router";
import configureStore from "./store.js";
import RadiumContainer from './containers/RadiumContainer';
import {Provider} from 'react-redux';
import routesContainer from "./routes";
import url from "url";
let routes = routesContainer; // make a copy so that routes writable, routesContainer is read-only
/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore();
const initialState = store.getState();
/**
 * Start Hapi server
 */
var envset = {
  production: process.env.NODE_ENV === 'production'
};
const hostname = envset.production
  ? (process.env.HOSTNAME || process['env'].HOSTNAME)
  : "localhost";
var port = envset.production
  ? (process.env.PORT || process['env'].PORT)
  : 8000
const server = new Server();
server.connection({host: hostname, port: port});
server.register([
  h2o2, inert,
  // WebpackPlugin
], (err) => {
  if (err) {
    throw err;
  }
  server.start(() => {
    console.info("==> ✅  Server is listening");
    console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
  });
});
/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
  method: "GET",
  path: "/{params*}",
  config: {
    state: {
      parse: false, // parse and store in request.state
      failAction: 'ignore' // may also be 'ignore' or 'log'
    }
  },
  handler: {
    file: (request) => "dist" + request.path
  }
});
/**
 * Endpoint that proxies all GitHub API requests to https://api.github.com.
 */
server.route({
  method: "GET",
  path: "/api/{path*}",
  handler: {
    proxy: {
      passThrough: true,
      mapUri(request, callback) {
        callback(null, url.format({protocol: "https", host: "api.detour.com", pathname: request.params.path, query: request.query}));
      },
      onResponse(err, res, request, reply, settings, ttl) {
        reply(res);
      }
    }
  }
});
/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
  if (typeof request.response.statusCode !== "undefined") {
    return reply.continue();
  }
  match({
    routes,
    location: request.path
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      reply.redirect(redirectLocation.pathname + redirectLocation.search);
      return;
    }
    if (error || !renderProps) {
      reply.continue();
      return;
    }
    const reactString = ReactDOM.renderToString(
      <Provider store={store}>
        <RadiumContainer radiumConfig={{
          userAgent: request.headers['user-agent']
        }}>
          <RouterContext {...renderProps}/>
        </RadiumContainer>
      </Provider>
    );
    const webserver = __PRODUCTION__
      ? ""
      : `//${hostname}:8080`;
    let output = (`<!doctype html>
    <html lang="en-us">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="description" content="">
        <meta name="keywords" content="">
        <title>Decentral</title>

        <link rel="stylesheet" href="css/vendor.bundle.css">
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/app.css">
      </head>
      <body>
        <div id="app">${reactString}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          window.__UA__ = ${JSON.stringify(request.headers['user-agent'])}
        </script>
        <script src="js/vendor.bundle.js"></script>
        <script src="js/app.bundle.js"></script>
      </body>
    </html>`);
    reply(output);
  });
});
if (__DEV__) {
  if (module.hot) {
    console.log("[HMR] Waiting for server-side updates");
    module
      .hot
      .accept("./routes", () => {
        routes = require("./routes");
      });
    module
      .hot
      .addStatusHandler((status) => {
        if (status === "abort") {
          setTimeout(() => process.exit(0), 0);
        }
      });
  }
}
