import config from '../../../config';
import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = config.apiBaseUrl;
const CLIENT_ID = config.clientId;
const CLIENT_SECRET = config.clientSecret;

export function signinUser({ email, password }) {

  return function(dispatch) {
    axios.post(`${ROOT_URL}/oauth/token`,
      {
        data: { grant_type: 'password',
          username: email,
          password: password
        },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET
        }
      })
      .then( response => {
        // if request is glyphicon-folder-open
        // - update the state to indicate user is authenticated
        // - save the auth token
        // redirect to the route /Tours
        browserHistory.push('/tours');
      })
      .catch(() => {
        // if request is bad, show error to user
      })
  }
}
