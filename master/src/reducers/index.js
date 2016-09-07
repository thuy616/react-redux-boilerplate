import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form,
  routing: routerReducer,
  auth: authReducer
});

export default rootReducer;
