/**
 * Created by kingw on 2016-04-10.
 */
import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction'

import Header from '../../components/header/Header.react';

class Base extends React.Component {

  componentWillMount() {
    const { auth } = this.props;
    const { router } = this.context;

    if (!auth.user_data) {
      router.push('/login');
    }
  };

  render(){
    return (
      <div id="baseContent">
        <Header
          user_data={this.props.auth.user_data}
          _logout={() => this.props.dispatch(logout())}
        />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
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