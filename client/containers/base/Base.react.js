/**
 * Created by kingw on 2016-04-10.
 */
import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

class Base extends React.Component {

  // TODO server auth를 해야하나...

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
        {this.props.children}
      </div>
    )
  }
}

Base.contextTypes ={
  router: PropTypes.object.isRequired
};

function mapStateToProps(state){
  const { auth } = state;
  console.log("state", state);
  return {
    auth
  }
}

export default connect(mapStateToProps)(Base);