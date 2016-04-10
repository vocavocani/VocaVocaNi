/**
 * Created by kingw on 2016-03-31.
 */

import {
  REGISTER_FORM, LOGIN_FORM,
  REGISTER_FAILED, REGISTER_SUCCESS,
  LOGIN_FAILED, LOGIN_SUCCESS
} from '../constants/ActionTypes';
import { loadUserData } from '../utils/utils'

/*******************
 *  User Form
 ********************/
export function userForm(state = {is_login_form: true}, action){
  switch (action.type) {
    // 로그인 FORM
    case LOGIN_FORM:
      return {
        ...state,
        is_login_form: true
      };
    // 회원가입 FORM
    case REGISTER_FORM:
      return {
        ...state,
        is_login_form: false
      };
    default:
      return state
  }
}

/*******************
 *  Register
 ********************/
const regInitState = {
  reg_error: null
};

export function register(state = regInitState, action){
  switch (action.type) {
    // 회원가입 실패
    case REGISTER_FAILED:
      console.log(action.error);
      return {
        ...state,
        reg_error: action.error
      };
    // 회원가입 성공
    case REGISTER_SUCCESS:
      return {
        ...state,
        reg_error: null
      };
    default:
      return state
  }
}

/*******************
 *  Login
 ********************/
const authInitialState = {
  login_error: null
};

function authInitializeState(){
  const user_data = loadUserData();
  return {...authInitialState, "user_data": user_data};
}

export function auth(state = authInitializeState(), action){
  switch (action.type) {
    case LOGIN_FAILED:
      console.log(action.error);
      return {
        ...state,
        login_error: action.error
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user_data: action.user_data
      };
    default:
      return state;
  }
}