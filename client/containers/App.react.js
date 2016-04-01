/**
 * Created by kingw on 2016-03-20.
 */

import React from 'react';

class App extends React.Component {
  render(){
    return (
      <div id="container">
        {this.props.children}
      </div>
    )
  }
}

export default App;