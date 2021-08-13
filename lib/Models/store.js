import { createStore, applyMiddleware, compose } from "redux"
import {taskMiddleware} from 'react-palm/tasks'
import thunk from "redux-thunk"
import promise from "redux-promise";
import cloneDeep from 'lodash.clonedeep'

import reducers from "./reducers"
import characterSheet from '../Data/characterSheet'
import opponentSheet from '../Data/opponentSheet'

function enhanceReduxMiddleware(middlewares = []) {
  return [...middlewares, taskMiddleware];
}

export const middlewares = enhanceReduxMiddleware([
  thunk,
  promise,
  // routerMiddleware(browserHistory)
]);

export const enhancers = [applyMiddleware(...middlewares)]

const initialState = {
  app: {
    deck: [],
    character: cloneDeep(characterSheet),
    opnt: cloneDeep(opponentSheet),
    selectedChar: null,
  }
}

// eslint-disable-next-line prefer-const
let composeEnhancers = compose;

/**
 * comment out code below to enable Redux Devtools
 */

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // actionsBlacklist: [
    // ]
  });
}

export default createStore(reducers, initialState, composeEnhancers(...enhancers))