import fetch from 'isomorphic-fetch';
import {
  LOGIN_FAILED, LOGIN_SUCCESSFULLY
} from '../constants/ActionTypes';
import {browserHistory} from 'react-router';

export function loginError(error){
  return {error, type: LOGIN_FAILED};
}

export function loginSuccess(response){
  console.log(response);
  return dispatch => {
    dispatch({response, type: LOGIN_SUCCESSFULLY});
    console.log("LOGIN SUCCESSFULLY");
    browserHistory.push('/timeline');
  };
}

export function login(userData){
  function parseJSON(response){
    return response.json()
  }
  return dispatch =>
    fetch('/api/login', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(parseJSON)
      .then(function (data){
        if(data.status == 1){
          console.log("a");
          dispatch(loginSuccess(data.username));
        } else {
          console.log("b");
          dispatch(loginError(error));
          throw error;
        }
      })
      .catch(error => {
        console.log("err1");
        console.log('request failed', error);
      });
}