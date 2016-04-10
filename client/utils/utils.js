/**
 * Created by kingw on 2016-04-10.
 */
import jwt_decode from 'jwt-decode';

//TODO statusCode 처리


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
      // user profile has expired.
      return {};
    }
    return user_data;
  } catch (err) {
    return null;
  }
}