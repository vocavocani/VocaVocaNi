/**
 * Created by kingw on 2016-04-10.
 */
import jwt_decode from 'jwt-decode';

export function checkStatus(response) {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)

    let error = new Error(response.statusText);  // error message
    error.response = response;

    if (response.status == 500){
      error = "일시적 서버 에러";
    }
    throw error;
  }
  return response;
}


export function parseJSON(response) {
  return response.json();
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function decodeUserData(token) {
  try {
    return jwt_decode(token);
  } catch (err) {
    return null;
  }
}

export function loadUserData() {
  try {
    const token = localStorage.getItem('token');
    const user_data = jwt_decode(token);
    const now = new Date().getTime() / 1000;

    if (now > user_data.exp) {
      removeToken();  // 브라우저 토큰 제거
      return false;
    }

    return user_data;
  } catch (err) {
    return null;
  }
}