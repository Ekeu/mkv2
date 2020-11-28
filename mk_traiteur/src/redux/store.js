import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  foodListReducer,
  foodDetailsReducer,
} from './reducers/food/food.reducers';
import { cartReducer } from './reducers/cart/cart.reducers';
const reducer = combineReducers({
  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,
  cart: cartReducer,
});

const cartFoodsFromStorage = localStorage.getItem('cartFoods')
  ? JSON.parse(localStorage.getItem('cartFoods'))
  : [];

const initialState = {
  cart: { cartFoods: cartFoodsFromStorage },
};

const middlewares = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
