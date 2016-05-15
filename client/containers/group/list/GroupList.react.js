/**
 * Created by kingw on 2016-04-10.
 */
import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

import GroupCreateCard from '../../../components/group/GroupCreateCard.react';

import './GroupList.css';

class GroupList extends React.Component {
  render() {
    return (
      <div className="row card-list">
        <GroupCreateCard/>
      </div>
    )
  }
}

export default GroupList;