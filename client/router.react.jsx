// React
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'
// Containers
import App from './containers/App.react';
import Login from './containers/user/Login.react';


const store = configureStore();


ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
);