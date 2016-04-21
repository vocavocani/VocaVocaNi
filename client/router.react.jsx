import 'babel-polyfill';
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
import Base from './containers/base/Base.react';
import GroupList from './containers/group/list/GroupList.react'


const store = configureStore();

//TODO IndexRoute를 home으로 변경해야함
ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/login" component={Login} />
        <Route component={Base}>
          <Route path="/group" component={GroupList} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
);