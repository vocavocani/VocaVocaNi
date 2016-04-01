import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

class Login extends React.Component {

  render() {
    return (
      <form className="LoginForm">
        아이디: <input type="text" ref="login_id" placeholder="아이디 입력"/>
        <br/>
        비밀번호: <input type="password" ref="login_pw" placeholder="비밀번호 입력"/>
        <br/>
      </form>
    )
  }
}

function mapStateToProps(state){
  return {
    data: state
  }
}

export default connect(mapStateToProps)(Login);