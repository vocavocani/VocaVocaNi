import React, {  PropTypes } from 'react'
import ReactDom from 'react-dom';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_value: null,
      form_error_string: null
    };
  }

  componentDidMount = () => {
    ReactDom.findDOMNode(this.refs.reg_id).focus();
  };

  _idREgCheck = e => {
    const regType = /^[A-Za-z0-9+]*$/g;
    if(!regType.test(e.target.value)){
      e.preventDefault();
      return;
    }
    this.setState({id_value: e.target.value});
  };

  _submitHandler = e => {
    e.preventDefault();
    const reg_id = this.refs.reg_id;
    const reg_nickname = this.refs.reg_nickname;
    const reg_pw_1 = this.refs.reg_pw_1;
    const reg_pw_2 = this.refs.reg_pw_2;

    const obj = {
      id: reg_id.value.trim(),
      nickname: reg_nickname.value.trim(),
      pw_1: reg_pw_1.value.trim(),
      pw_2: reg_pw_2.value.trim()
    };

    this.setState({form_error_string: null});
    const regType = /^[A-Za-z0-9+]*$/;  // only en, num
    if(!regType.test(obj.id)) {
      this.setState({form_error_string: "ID는 영문과 숫자의 조합이여야합니다."});
      reg_id.value = '';
      reg_id.focus();
      return
    }
    if(obj.pw_1.length < 6){
      this.setState({form_error_string: "비밀번호는 6자리 이상이여야 합니다."});
      reg_pw_1.value = '';
      reg_pw_2.value = '';
      reg_pw_1.focus();
      return;
    }
    if(obj.pw_1 != obj.pw_2){
      this.setState({form_error_string: "비밀번호가 일치하지 않습니다."});
      reg_pw_1.value = '';
      reg_pw_2.value = '';
      reg_pw_1.focus();
      return;
    }

    this.props.onRegisterSubmit(obj);
  };

  _formChange = e => {
    this.props.formChange(e);
  };

  render() {
    let error_string = this.state.form_error_string;
    const reg_error = this.props.reg_error;

    if(reg_error != null &&
      this.state.form_error_string == null){
      error_string = "아이디가 중복됩니다."
    }

    return (
      <form onSubmit={this._submitHandler.bind(this)}>
        <h3>회원 가입</h3>
        <input type="text" ref="reg_id" placeholder="아이디 (영문,숫자 조합)" maxLength="50"
               onChange={this._idREgCheck} value={this.state.id_value} required/>
        <input type="text" ref="reg_nickname" placeholder="닉네임" maxLength="50" required/>
        <input type="password" ref="reg_pw_1" placeholder="비밀번호 (6자리이상)" required/>
        <input type="password" ref="reg_pw_2" placeholder="비밀번호 확인" required/>

        <div className="error-message">
          {error_string}
        </div>

        <button type="submit">create</button>
        <p className="message">이미 가입하셨나요? <span className="change-form" onClick={this._formChange}>로그인</span></p>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  onRegisterSubmit: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired,
  reg_error: PropTypes.object.isRequired
};