/**
 * Created by kingw on 2016-04-13.
 */
import React, {  PropTypes } from 'react'
import ReactDom from 'react-dom';

import './Header.css';

export default class Header extends React.Component {

  _onLogoutClick = e => {
    e.preventDefault();
    this.props._logout();
  };

  render() {
    const { user_data } = this.props;

    return (
      <header className="header-two-bars">

        <div className="header-first-bar ver">

          <div className="container">
            <div className="row">
              <div className="col-xs-2 logo">
                <img src="./images/header_title.png" alt="vocavocaini"/>
              </div>

              <div className="col-xs-offset-6 col-xs-3 user-information">
                <p className="user-id-nickname">
                  {user_data.nickname}({user_data.id})
                </p>
              </div>

              <div className="col-sm-1 user-logout">
                <button className="logout-btn btn"
                        onClick={this._onLogoutClick}>
                  logout
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className="header-second-bar">

          <div className="container">
            <div className="row">
              <div className="col-xs-offset-4 col-xs-2 nav">
                <i className="fa fa-group"></i> Group
              </div>
              <div className="col-xs-2 nav">
                <i className="fa fa-search"></i> Search
              </div>
            </div>
          </div>
        </div>

      </header>
    )
  }
}

Header.propTypes = {
  user_data: PropTypes.object.isRequired,
  _logout: PropTypes.func.isRequired
};