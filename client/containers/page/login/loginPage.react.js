/**
 * Created by kingw on 2016-03-18.
 */

import React from 'react';
import { login } from '../../../actions/actions'
import LoginComponent from '../../../components/user/Login.react'
import { store } from '../../../store/store'

export default class LoginPage extends React.Component {

  render(){
    return (
      <div class="LoginBox">
        <h1>로그인 페이지</h1>
        <LoginComponent
          onLoginClick={data =>
          store.dispatch(login(data))}
        />
      </div>
    )
  }
}