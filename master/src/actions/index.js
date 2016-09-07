import config from '../../../config';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import { AUTH_USER } from './types';
import Wreck from 'wreck';

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
      .then( (response) => response.json())
      .then((body) => {
        if (body.statusCode === 200) {
          // - update the state to indicate user is authenticated
          dispatch({ type: AUTH_USER });
          // - save the auth token
          localStorage.setItem('auth', body.data);
          // redirect to the route /Tours
          browserHistory.push('/tours');
        } else {
          // render error message
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
