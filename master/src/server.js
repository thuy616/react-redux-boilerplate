import koa from "koa";
import proxy from "koa-proxy";
import serve from "koa-static";

import React from "react";
import ReactDOM from "react-dom/server";
import {RoutingContext, match} from "react-router";
import {createLocation} from "history";

import routes from "./routes";
import config from '../../config';

const app      = koa();
const hostname = process.env.HOSTNAME || "localhost";
const port     = process.env.PORT || config.port || 8080;

app.use(serve("static", {defer: true}));

// proxy through to the api
app.use(proxy({
  host: config.apiBaseUrl || 'https://api.detour.com',
  match: /^\/api\//i,
  map: (path) => path.replace(/^\/api\//i, "/")
}));

app.use(function *(next) {
  const location = createLocation(this.path);
  const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":" + port;

  yield ((callback) => {
    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        this.redirect(redirectLocation.pathname + redirectLocation.search, "/");
        return;
      }

      if (error || !renderProps) {
        callback(error);
        return;
      }
    });
  });
});


app.listen(port, () => {
  console.info("==> ✅  Server is listening");
  console.info("==> 🌎  Go to http://%s:%s", hostname, port);
});
