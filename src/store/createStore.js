import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';

let preloadedState = {};
if (typeof window !== 'undefined') {
  preloadedState = window.__PRELOADED_STATE__ || {};
  delete window.__PRELOADED_STATE__
}

export default () => {
  const store = createStore(reducers, preloadedState, applyMiddleware(thunk));
  return store;
};
