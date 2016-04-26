import React, {  PropTypes } from 'react'
import ReactDom from 'react-dom';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_value: null,
      form_error_string: null
    };
  }

  componentDidMount = () => {
    ReactDom.findDOMNode(this.refs.user_id).focus();
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
    const user_id = this.refs.user_id;
    const user_pw = this.refs.user_pw;
    const obj = {
      id: user_id.value.trim(),
      pw: user_pw.value.trim()
    };

    this.setState({form_error_string: null});
    const regType = /^[A-Za-z0-9+]*$/;  // only en, num
    if(!regType.test(obj.id)) {
      this.setState({form_error_string: "ID는 영문과 숫자의 조합이여야합니다."});
      user_id.value = '';
      user_id.focus();
      return
    }

    this.props.onLoginSubmit(obj);
  };

  _formChange = e => {
    this.props.formChange(e);
  };

  render() {
    let error_string = this.state.form_error_string || this.props.login_error;

    return (
      <form onSubmit={this._submitHandler.bind(this)}>
        <h3>로그인</h3>
        <input type="text" ref="user_id" placeholder="아이디" maxLength="50"
               onChange={this._idREgCheck} value={this.state.id_value} required/>
        <input type="password" ref="user_pw" placeholder="비밀번호" required/>

        <div className="error-message">
          {error_string}
        </div>

        <button type="submit">login</button>
        <p className="message">아이디가 없으신가요? <span className="change-form" onClick={this._formChange}>회원가입</span></p>
      </form>
    )
  }
}

LoginForm.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
  formChange: PropTypes.func.isRequired,
  login_error: PropTypes.object.isRequired
};