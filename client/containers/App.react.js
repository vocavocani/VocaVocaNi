/**
 * Created by kingw on 2016-03-20.
 */

import React from 'react';
import { connect } from 'react-redux';

import './App.css';

class App extends React.Component {
  render(){
    return (
      <div id="appContent">
        {this.props.children}
      </div>
    )
  }
}

export default App;