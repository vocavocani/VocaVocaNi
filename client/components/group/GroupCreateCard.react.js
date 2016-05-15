import React, {  PropTypes } from 'react'
import ReactDom from 'react-dom';

export default class GroupCreateCard extends React.Component {

  render() {
    return (
      <div className="col-md-3 col-sm-4">
        <div className="card-background">
          <img src="./images/plust.png" alt="plust" className="group-img"/>
          <div className="card-content">
            <div className="group-title">
              그룹만들기
            </div>
          </div>
        </div>
      </div>
    )
  }
}