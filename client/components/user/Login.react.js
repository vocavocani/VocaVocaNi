import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class LoginComponent extends React.Component {

  render() {
    return (
      <form className="LoginForm" onSubmit={this._submitHandler.bind(this)}>
        아이디: <input type="text" ref="login_id" placeholder="아이디 입력"/>
        <br/>
        비밀번호: <input type="password" ref="login_pw" placeholder="비밀번호 입력"/>
        <br/>
        <button type="submit">로그인</button>
      </form>
    )
  }

  componentDidMount = () =>{
    React.findDOMNode(this.refs.login_id).focus();
  };

  _submitHandler = e => {
    e.preventDefault();
    const login_id = this.refs.login_id;
    const login_pw = this.refs.login_pw;
    const obj = {
      id: login_id.value.trim(),
      pw: login_pw.value.trim()
    };

    this.props.onLoginClick(obj);

    login_id.value = '';
    login_pw.value = '';
  };
};

LoginComponent.propTypes = {
  onLoginClick: PropTypes.func.isRequired
};