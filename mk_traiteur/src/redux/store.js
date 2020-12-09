import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  foodListReducer,
  foodDetailsReducer,
} from './reducers/food/food.reducers';
import { cartReducer } from './reducers/cart/cart.reducers';
import { userLoginReducer, userRegisterReducer } from './reducers/user/user.reducers';
const reducer = combineReducers({
  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

const cartFoodsFromStorage = localStorage.getItem('cartFoods')
  ? JSON.parse(localStorage.getItem('cartFoods'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: { cartFoods: cartFoodsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
