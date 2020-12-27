import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  foodListReducer,
  foodDetailsReducer,
  foodDeleteReducer,
  foodCreateReducer,
  foodUpdateReducer,
  foodCreateReviewReducer
} from './reducers/food/food.reducers';
import { cartReducer } from './reducers/cart/cart.reducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/user/user.reducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListUserReducer,
  orderListReducer
} from './reducers/order/order.reducers';
const reducer = combineReducers({
  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,
  foodDelete: foodDeleteReducer,
  foodCreate: foodCreateReducer,
  foodUpdate:foodUpdateReducer,
  foodCreateReview: foodCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListUser: orderListUserReducer,
  orderList: orderListReducer
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
