import {
  CART_ADD_FOOD,
  CART_REMOVE_FOOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from './cart.types';

export const cartReducer = (
  state = { cartFoods: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_FOOD:
      const payload = action.payload;

      const existFood = state.cartFoods.find(
        (food) => food._id === payload._id
      );

      if (existFood) {
        return {
          ...state,
          cartFoods: state.cartFoods.map((food) =>
            food._id === existFood._id ? payload : food
          ),
        };
      } else {
        return {
          ...state,
          cartFoods: [...state.cartFoods, payload],
        };
      }
    case CART_REMOVE_FOOD:
      return {
        ...state,
        cartFoods: state.cartFoods.filter(
          (food) => food._id !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
