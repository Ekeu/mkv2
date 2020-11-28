import { CART_ADD_FOOD } from './cart.types';

export const cartReducer = (state = { cartFoods: [] }, action) => {
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
    default:
      return state;
  }
};
