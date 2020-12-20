import axios from 'axios';
import {
  CART_ADD_FOOD,
  CART_REMOVE_FOOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from './cart.types';

export const addToCart = (_id, qty, topping, ship) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/foods/${_id}`);

  dispatch({
    type: CART_ADD_FOOD,
    payload: {
      _id: data._id,
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      availability: data.availability,
      toppings: data.toppings,
      qty,
      topping,
      ship,
    },
  });

  localStorage.setItem('cartFoods', JSON.stringify(getState().cart.cartFoods));
};

export const removeFromCart = (_id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_FOOD,
    payload: _id,
  });

  localStorage.setItem('cartFoods', JSON.stringify(getState().cart.cartFoods));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
