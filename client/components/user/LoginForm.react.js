import React, {  PropTypes } from 'react'
import ReactDom from 'react-dom';

export default class LoginForm extends React.Component {

  componentDidMount = () => {
    ReactDom.findDOMNode(this.refs.reg_id).focus();
  };

  _submitHandler = e => {
    // TODO 비밀번호 확인 리액트에서 하기
    e.preventDefault();
    const reg_id = this.refs.reg_id;
    const reg_pw = this.refs.reg_pw;
    const obj = {
      id: reg_id.value.trim(),
      pw_1: reg_pw.value.trim()
    };
    this.props.onLoginSubmit(obj);
    reg_id.value = '';
    reg_pw.value = '';
  };

  _formChange = e => {
    this.props.formChange(e);
  };

  render() {
    return (
      <form onSubmit={this._submitHandler.bind(this)}>
        <h3>로그인</h3>
        <input type="text" ref="reg_id" placeholder="아이디"/>
        <input type="password" ref="reg_pw" placeholder="비밀번호"/>
        <button type="submit">login</button>
        <p className="message">아이디가 없으신가요? <span className="change-form" onClick={this._formChange}>회원가입</span></p>
      </form>
    )
  }
}

LoginForm.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired
};