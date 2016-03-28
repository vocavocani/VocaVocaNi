import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from '../reducers/reducers';


export let store = createStore(user, applyMiddleware(thunk));