/**
 * Created by kingw on 2016-03-31.
 */

import {
  REGISTER_FORM, LOGIN_FORM,
  REGISTER_FAILED, REGISTER_SUCCESS,
  LOGIN_FAILED, LOGIN_SUCCESS
} from '../constants/ActionTypes';


/*******************
 *  User Reducer
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

const regInitState = {
  reg_id: null,
  reg_pw_1: null,
  reg_pw_2: null,
  reg_error: null
};

export function register(state = regInitState, action){
  switch (action.type) {
    // 회원가입 실패
    case REGISTER_FAILED:
      return {
        ...state,
        reg_error: action.error
      };
    // 회원가입 성공
    case REGISTER_SUCCESS:
      return {
        ...state
      };
    default:
      return state
  }
}