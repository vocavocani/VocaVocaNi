// React
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// Redux
import { Provider } from 'react-redux';
import {store} from './store/store'

import Page from './containers/page/Page.react.js';
import LoginPage from './containers/page/login/loginPage.react';


ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Page}>
        <IndexRoute component={LoginPage}>
          <Route path="/login" component={LoginPage} />
        </IndexRoute>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
);