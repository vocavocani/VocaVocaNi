/**
 * Created by kingw on 2016-05-15.
 */
import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

import './Group.css';

class GroupCreate extends React.Component {
  render() {
    return (
      <div className="group-create-page">
        <div className="group-create-title">그룹 만들기</div>
      </div>
    )
  }
}

export default GroupCreate;