import {createStore, applyMiddleware, compose} from 'redux';
import RootReducer from './RootReducer';
import thunk from 'redux-thunk';
const middleware = [thunk];

const initialState = {};
const store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
