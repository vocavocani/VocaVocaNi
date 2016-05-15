/**
 * Created by kingw on 2016-04-10.
 */
import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction'

import Header from '../../components/header/Header.react';

import './Base.css';

class Base extends React.Component {

  componentWillMount() {
    const { auth } = this.props;
    const { router } = this.context;

    if (!auth.user_data) {
      router.push('/login');
    }
  };

  render(){
    const { auth } = this.props;
    // 이건쫌 아닌거같은데
    if(auth.user_data) {
      return (
        <div id="baseContent">
          <Header
            user_data={this.props.auth.user_data}
            _logout={() => this.props.dispatch(logout())}
          />
          <div className="container base">
            {this.props.children}
          </div>
        </div>
      )
    }else{
      return (
        <div id="notAuth">
        </div>
      )
    }
  }
}

Base.propTypes = {
  dispatch: PropTypes.func.isRequired
};

Base.contextTypes ={
  router: PropTypes.object.isRequired
};

function mapStateToProps(state){
  const { auth } = state;

  return {
    auth
  }
}

export default connect(mapStateToProps)(Base);