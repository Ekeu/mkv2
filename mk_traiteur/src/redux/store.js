import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  foodListReducer,
  foodDetailsReducer,
} from './reducers/food/food.reducers';
import { cartReducer } from './reducers/cart/cart.reducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/user/user.reducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer
} from './reducers/order/order.reducers';
const reducer = combineReducers({
  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer
});

const cartFoodsFromStorage = localStorage.getItem('cartFoods')
  ? JSON.parse(localStorage.getItem('cartFoods'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const paymentMethod = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : '';

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartFoods: cartFoodsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethod,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
