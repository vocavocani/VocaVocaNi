/**
 * Created by kingw on 2016-03-31.
 */
import 'isomorphic-fetch';

import {
  REGISTER_FAILED, REGISTER_SUCCESS,
  LOGIN_REQEUST, LOGIN_FAILED, LOGIN_SUCCESS
} from '../constants/ActionTypes';
import { browserHistory } from 'react-router'


/*******************
 *  Register Action Creator
 ********************/
function registerSuccess(){
  return {
    type: REGISTER_SUCCESS
  }
}

function registerFailed(error){
  return {
    type: REGISTER_FAILED,
    error
  }
}

export function register(reg_data){
  function parseJSON(response){
    return response.json()
  }

  return dispatch => {
    return fetch('/api/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reg_data)
    }).then(parseJSON)
      .then((data) => {
        if(data.status == 1){
          browserHistory.push('/login');
          dispatch(registerSuccess());
        } else {
          console.log("Register form failed", data.error);
          dispatch(registerFailed(data.error))
        }
      })
    .catch((error) => {
      console.log('Register request failed', error);
      dispatch(registerFailed(error));
    });
  };
}