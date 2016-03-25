/**
 * Created by kingw on 2016-03-18.
 */

import React from 'react';

export default class LoginPage extends React.Component {
  componentDidMount = () =>{
    React.findDOMNode(this.refs.login_id).focus();
  };

  _submitHandler = e => {
    e.preventDefault();
    var id = this.refs.login_id.getDOMNode().value;
    alert(id);
  };

  render(){
    return (
      <div class="loginBox">
        <h1>로그인 페이지</h1>
        <form onSubmit={this._submitHandler.bind(this)}>
          아이디: <input type="text" ref="login_id" placeholder="아이디 입력"/>
          <br/>
          비밀번호: <input type="password" ref="login_pw" placeholder="비밀번호 입력"/>
          <br/>
          <button type="submit">로그인</button>
        </form>
      </div>
    )
  }
}