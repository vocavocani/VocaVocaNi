/**
 * Created by kingw on 2016-04-10.
 */
import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import GroupCreateCard from '../../components/group/GroupCreateCard.react.js';

import './Group.css';

class GroupList extends React.Component {
  render() {
    return (
      <div className="row card-list">
        <Link to="/group/create">
          <GroupCreateCard/>
        </Link>
      </div>
    )
  }
}

export default GroupList;