import {
  LOGIN_FAILED, LOGIN_SUCCESSFULLY
} from '../constants/ActionTypes';

const initialState = {
  userData: {
    username: undefined,
    id: name
  },
  isLoggedIn: false,
  error: null
};

export default function user(state = initialState, action){
  switch (action.type) {
    // 로그인 실패시
    case LOGIN_FAILED:
      return Object.assign(state, {
        error: action.error,
        isLoggedIn: false
      });
    // 로그인 성공시
    case LOGIN_SUCCESSFULLY:
      return Object.assign(state, {
        userData: {
          username: action.response
        },
        error: null,
        isLoggedIn: true
      });
  }
}