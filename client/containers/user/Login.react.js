import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { register, loginForm, registerForm } from '../../actions/userAction';

import LoginForm from '../../components/user/LoginForm.react';
import RegisterForm from '../../components/user/RegisterForm.react';

import './user.css';

class Login extends React.Component {

  _formChange = () =>{
    if(this.props.userForm.is_login_form){
      this.props.dispatch(registerForm());
    }else{
      this.props.dispatch(loginForm());
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">

          <div className="main-title">
            <img src="./images/main_title.png" alt="vocavocani"/>
          </div>

          <div className="login-page">
            <div className="form">
              {
                this.props.userForm.is_login_form ?
                  <LoginForm
                    onLoginSubmit={data =>
                      this.props.dispatch(register(data))}  // TODO Login 액션으로 수정 필요
                    formChange={this._formChange}
                  />
                  :
                  <RegisterForm
                    onRegisterSubmit={data =>
                      this.props.dispatch(register(data))}
                    formChange={this._formChange}
                  />
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state){
  const { userForm, register } = state;

  return {
    error: state.reg_error,
    userForm,
    register
  }
}

export default connect(mapStateToProps)(Login);