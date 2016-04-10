import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { register, login,
  loginForm, registerForm } from '../../actions/userAction';

import LoginForm from '../../components/user/LoginForm.react';
import RegisterForm from '../../components/user/RegisterForm.react';

import './user.css';

class Login extends React.Component {
  componentWillMount() {
    const { auth } = this.props;
    const { router } = this.context;

    if (auth.user_data) {
      router.push('/group');
    }
  };

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;

    if (nextProps.auth.user_data) {
      router.push('/group');
    }
  }

  _formChange = () =>{
    if(this.props.userForm.is_login_form){
      this.props.dispatch(registerForm());
    } else {
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
                      this.props.dispatch(login(data))}
                    formChange={this._formChange}
                    login_error={this.props.auth.login_error}
                  />
                  :
                  <RegisterForm
                    onRegisterSubmit={data =>
                      this.props.dispatch(register(data))}
                    formChange={this._formChange}
                    reg_error={this.props.register.reg_error}
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

Login.contextTypes ={
  router: PropTypes.object.isRequired
};

function mapStateToProps(state){
  const { userForm, register, auth } = state;

  return {
    auth,
    userForm,
    register,
    error: null
  }
}

export default connect(mapStateToProps)(Login);