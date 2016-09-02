import config from '../../../config';
import axios from 'axios';

const ROOT_URL = config.apiBaseUrl;
const CLIENT_ID = config.clientId;
const CLIENT_SECRET = config.clientSecret;

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    let grant_type = 'password';

    console.log("signing in: ");
    console.log(email);
    console.log(password);
    console.log({ grant_type, email, password });

    axios.post(`${ROOT_URL}/oauth/token`,
      { grant_type, email, password },
      {
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET
        }
      });
    // Header Authorization
    // type: Basic Author
    let username = config.clientId;
    let password = config.clientSecret;


    // if request is glyphicon-folder-open
    // - update the state to indicate user is authenticated
    // - save the auth token
    // redirect to the route /Tours

    // if request is bad, show error to user
  }
}
