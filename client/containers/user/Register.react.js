import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/userAction';

class Register extends React.Component {

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
    this.props.dispatch(register(obj));
    reg_id.value = '';
    reg_pw_1.value = '';
    reg_pw_2.value = '';
  };

  render() {
    return (
      <form className="RegisterForm" onSubmit={this._submitHandler.bind(this)}>
        아이디: <input type="text" ref="reg_id" placeholder="아이디 입력"/>
        <br/>
        비밀번호: <input type="password" ref="reg_pw_1" placeholder="비밀번호 입력"/>
        <br/>
        비밀번호확인: <input type="password" ref="reg_pw_2" placeholder="비밀번호 입력"/>
        <button type="submit">가입하기</button>
      </form>
    )
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    error: state.reg_error,
    data: state
  }
}

export default connect(mapStateToProps)(Register);