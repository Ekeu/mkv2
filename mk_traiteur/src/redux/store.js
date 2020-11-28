import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { foodListReducer, foodDetailsReducer } from './reducers/food/food.reducers'
const reducer = combineReducers({
    foodList: foodListReducer,
    foodDetails: foodDetailsReducer
});

const initialState = {};

const middlewares = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
