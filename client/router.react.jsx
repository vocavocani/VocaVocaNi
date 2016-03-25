import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import Page from './containers/page/Page.react.js';
import LoginPage from './containers/page/login/loginPage.react';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

let isLogin = false;  // 실제 로그인 구현하면 default는 false

if(isLogin){  // login 됐을때
  ReactDom.render(
    <Router history={browserHistory}>
      <Route component={Page}>
      </Route>
    </Router>,
    document.getElementById('content')
  );
} else {
  ReactDom.render(
    <Router>
      <Route path="/" component={LoginPage}/>
    </Router>,
    document.getElementById('content')
  );
}