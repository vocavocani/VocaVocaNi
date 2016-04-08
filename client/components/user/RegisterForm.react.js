import React, {  PropTypes } from 'react'
import ReactDom from 'react-dom';

export default class RegisterForm extends React.Component {

  componentDidMount = () => {
    ReactDom.findDOMNode(this.refs.reg_id).focus();
  };

  _submitHandler = e => {
    // TODO 비밀번호 확인 리액트에서 하기
    e.preventDefault();
    const reg_id = this.refs.reg_id;
    const reg_pw_1 = this.refs.reg_pw_1;
    const reg_pw_2 = this.refs.reg_pw_2;
    const obj = {
      id: reg_id.value.trim(),
      pw_1: reg_pw_1.value.trim(),
      pw_2: reg_pw_2.value.trim()
    };
    this.props.onRegisterSubmit(obj);
    reg_id.value = '';
    reg_pw_1.value = '';
    reg_pw_2.value = '';
  };

  _formChange = e => {
    this.props.formChange(e);
  };

  render() {
    return (
      <form onSubmit={this._submitHandler.bind(this)}>
        <h3>회원 가입</h3>
        <input type="text" ref="reg_id" placeholder="아이디"/>
        <input type="password" ref="reg_pw_1" placeholder="비밀번호"/>
        <input type="password" ref="reg_pw_2" placeholder="비밀번호 확인"/>
        <button type="submit">create</button>
        <p className="message">이미 가입하셨나요? <span className="change-form" onClick={this._formChange}>로그인</span></p>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  onRegisterSubmit: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired
};