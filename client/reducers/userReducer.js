/**
 * Created by kingw on 2016-03-31.
 */

import {
  REGISTER_FAILED, REGISTER_SUCCESS,
  LOGIN_FAILED, LOGIN_SUCCESS
} from '../constants/ActionTypes';


/*******************
 *  Register Reducer
 ********************/
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