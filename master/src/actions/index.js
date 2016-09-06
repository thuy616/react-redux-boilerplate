import config from '../../../config';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

const CLIENT_ID = config.clientId;
const CLIENT_SECRET = config.clientSecret;

let detourApi = config.detourApi;

if (__CLIENT__) {
  const { protocol, hostname, port } = window.location;
  detourApi = `${protocol}//${hostname}:${port}/api`;
}

export function signinUser(payload) {
  return function(dispatch) {
    return fetch(`${detourApi}/oauth/token`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/json; charset=utf-8',
          "Authorization" : "Basic " + new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64")
        },
        body: JSON.stringify({
          grant_type: payload.grant_type,
          username: payload.email,
          password: payload.password
        })
      })
      .then((response) => { response.json() })
      .then((value) => {
        // if request is glyphicon-folder-open
        // - update the state to indicate user is authenticated
        // - save the auth token
        // redirect to the route /Tours
        browserHistory.push('/tours');
      })
      .catch((error) => {
        // if request is bad, show error to user
      })
  }
}

export function fetchGuides() {
    return function(dispatch) {
      return fetch(`${detourApi}/detour/guides`).then((response) => {
        response.json();
      }).then((value) => {
        console.log(value);
      });
    }
}
