/**
 * Created by kingw on 2016-03-31.
 */
import 'isomorphic-fetch';

import {
  REGISTER_FORM, LOGIN_FORM,
  REGISTER_FAILED, REGISTER_SUCCESS,
  LOGIN_FAILED, LOGIN_SUCCESS,
  LOGOUT
} from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import {
  checkStatus, parseJSON, decodeUserData,
  setToken, removeToken } from '../utils/utils';

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

export function registerForm(){
  return {
    type: REGISTER_FORM
  }
}

export function loginForm(){
  return {
    type: LOGIN_FORM
  }
}

export function register(reg_data){
  return dispatch => {
    return fetch('/api/user/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reg_data)
    }).then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        if(data.error){
          dispatch(registerFailed(data.error));
        }else{
          browserHistory.push('/login');
          dispatch(registerSuccess());
          dispatch(loginForm());
        }
      })
      .catch((error) => {
        console.log('Register request failed', error);
        dispatch(registerFailed(error));
      });
  };
}

/*******************
 *  Login Action Creator
 ********************/
function loginSuccess(jwt_token){
  setToken(jwt_token);
  const user_data = decodeUserData(jwt_token);
  return {
    type: LOGIN_SUCCESS,
    user_data: user_data
  }
}

function loginFailed(error){
  return {
    type: LOGIN_FAILED,
    error
  }
}

export function logout(){
  removeToken();
  browserHistory.push('/login');
  return {
    type: LOGOUT
  }
}

export function login(user_data){
  return dispatch => {
    return fetch('/api/user/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user_data)
    }).then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        if(data.error){
          dispatch(loginFailed(data.error));
        }else{
          dispatch(loginSuccess(data.token));
        }
      })
      .catch((error) => {
        console.log("Login failed", error);
        dispatch(loginFailed(error));
      });
  };
}
